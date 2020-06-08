import React, {useState, useEffect} from 'react';
import fire from './config';
const d3 = require("d3");

function MovieGraph() {    
    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);
    const [movies, setMovies] = useState({});
    const [shouldRender, setShowRender] = useState(true);


    useEffect(() => {
        let ref = fire.database().ref('Graphs');        
        ref.once('value', (snapshot) => {
            const val = snapshot.val();
            setMovies(val);
            const keys = Object.keys(val);
            var group_1 = [];
            var group_2 = [];
            for(var i = 0; i < keys.length; i++) {
                console.log(val[keys[i]].Poster)
                group_1.push({
                    group: "movie",
                    id: keys[i],
                    poster: val[keys[i]].Poster
                });
                const actors = val[keys[i]].Actors.split(", ");
                for(var j = 0; j < actors.length; j++) {
                    if(!group_1.some(elem => elem.id === actors[j])) {
                        group_1.push({
                            group: "actor",
                            id: actors[j]
                        });
                    }
                    group_2.push({
                        source: keys[i],
                        target: actors[j]
                    })
                }
            }
            setNodes(group_1);
            setLinks(group_2);
            const elem = document.getElementById("svg");
            elem.appendChild(graph(group_1, group_2));
        })

    }, [shouldRender])

    const drag = (sim, label) => {
        const dragStarted = (d) => {
            if(!d3.event.active) {
                sim.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;                
            }
        }

        const dragged = (d) => {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
            label.attr("x", d.x)
                .attr("y", d.y - 30);
        }

        const dragEnded = (d) => {
            if(!d3.event.active) {
                sim.alphaTarget(0);
            }
            d.fx = null;
            d.fy = null;

        }

        return d3.drag()
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragEnded);
    }

    const graph = (group_1, group_2) => {
        const width = 2000;
        const height = 1000;

        const obj_nodes = group_1.map(obj => Object.create(obj));
        const obj_links = group_2.map(obj => Object.create(obj));

        const svg = d3.create("svg")
            .attr("viewBox", [0, 0, width, height]);

        var defs = svg.append("svg:defs");

        group_1.forEach((d, i) => {
            if(d.group === "movie") {
                defs.append("svg:pattern")
                    .attr("id", "poster_" + d.id)
                    .attr("width", 1) 
                    .attr("height", 1)
                    .attr("patternUnits", "objectBoundingBox")
                    .append("svg:image")
                    .attr("xlink:href", d.poster)
                    .attr("width", 300)
                    .attr("height", 300)
                    .attr("x", -50)
                    .attr("y", -50);
            }
        })

        const link = svg.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.5)
            .selectAll("line")
            .data(obj_links)
            .join("line")
            .attr("stroke-width", 1.2);

        const radius = (node) => {
            if(node.group === "movie") {
                return 80;
            }
            else if(node.group === "actor") {
                return 20;
            }
        }

        const color = (node) => {
            if(node.group === "movie") {
                return "url(#poster_" + node.id + ")";
            }
            else if(node.group === "actor") {
                return "steelblue";
            }
        }

        const simulation = d3.forceSimulation(obj_nodes)
            .force("link", d3.forceLink().links(group_2).id(d => { return d.id; }).distance(180))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2));

        const label = svg.append("text")
            .attr("id", "label")
            .attr("font-size", 30)
            .attr("opacity", 0)
            .style("text-anchor", "middle")
            .text("");

        const node = svg.append("g")
            .selectAll("circle")
            .data(obj_nodes)
            .join("circle")
            .attr("r", radius)
            .style("fill", color)
            .call(drag(simulation, label));

        node.on("mouseover", (d) => {
            if(d.group === "actor") {
                var c = d3.select(this);
                label
                    .raise()
                    .attr("opacity", 1)
                    .text(d.id)
                    .attr("x", d.x)
                    .attr("y", d.y - 30);
            }
        })
        .on("mouseout", (d) => {
            if(d.group === "actor") {
                label
                    .attr("opacity", 0)
                    .text(d.id);
            }
        });

        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
            
            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
        })
        
        return svg.node();
    }

    return (<div id="svg">
            </div>);
}

export default MovieGraph;