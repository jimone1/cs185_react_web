import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import SubjectIcon from '@material-ui/icons/Subject';
import Modal from '@material-ui/core/Modal';

import DarkRoad1 from '../assets/ImageGallery/Image1.JPG';
import Solvang from '../assets/ImageGallery/Image2.JPG';
import Forest from '../assets/ImageGallery/Image3.jpg';
import Trees from '../assets/ImageGallery/Image4.jpg';
import Fields from '../assets/ImageGallery/Image5.jpg';
import Beach1 from '../assets/ImageGallery/Image6.jpg';
import Beach2 from '../assets/ImageGallery/Image7.jpg';
import Beach3 from '../assets/ImageGallery/Image8.jpg';
import DarkRoad2 from '../assets/ImageGallery/Image9.jpg';
import JapaneseHouse from '../assets/ImageGallery/Image10.jpg';
import Sky from '../assets/ImageGallery/Image11.jpg';
import Hallway from '../assets/ImageGallery/Image12.jpg';

const imageData = [
    {
        img: DarkRoad1,
        title: "Dark Road",
        id: 0,
        featured: false
    },
    {
        img: Solvang,
        title: "Solvang",
        id: 1,
        featured: false
    },
    {
        img: Forest,
        title: "Forest",
        id: 2,
        featured: false
    },
    {
        img: Trees,
        title: "Trees",
        id: 3,
        featured: false
    },
    {
        img: Fields,
        title: "Fields",
        id: 4,
        featured: false
    },
    {
        img: Beach1,
        title: "Beach1",
        id: 5,
        featured: false
    },
    {
        img: Beach2,
        title: "Beach2",
        id: 6,
        featured: false
    },
    {
        img: Beach3,
        title: "Beach3",
        id: 7,
        featured: false
    },
    {
        img: DarkRoad2,
        title: "DarkRoad2",
        id: 8,
        featured: false
    },
    {
        img: JapaneseHouse,
        title: "JapaneseHouse",
        id: 9,
        featured: false
    },
    {
        img: Sky,
        title: "Sky",
        id: 10,
        featured: false
    },
    {
        img: Hallway,
        title: "Hallway",
        id: 11,
        featured: false
    },
]

  
function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const buttonStyle = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        border: 'none',
        padding: theme.spacing(2, 4, 3),
    },
}));

const galleryStyle = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden'
    },
    gridList: {
        position: 'absolute',
        paddingTop: '50px', 
        paddingBottom: '50px',
        backgroundColor: '#2e2e2ebd',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gridGap: '1rem', 
        width: '100%'
    },
    titleBar: {
      background:
        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
      color: 'white',
    },
}));

function ImageGallery(props) {
    const imageGallery = galleryStyle();

    const [open, setOpen] = React.useState(false);
    const [key, setKey] = React.useState(1);

    const butStyle = buttonStyle();

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    
    return (
        <div className={imageGallery.root}>
            <GridList cellHeight={150} spacing={1} className={imageGallery.gridList}>
                {imageData.map((tile) => (
                    <GridListTile key={tile.img} cols={2} rows={2}>
                        <img src={tile.img} alt={tile.title} />
                    <GridListTileBar
                        title={tile.title}
                        titlePosition="top"
                        actionIcon={
                        <IconButton aria-label={`star ${tile.title}`} className={imageGallery.icon} 
                            onClick={() =>{
                                setKey(tile.id);
                                handleOpen();
                            }}>
                            <SubjectIcon />
                        </IconButton>
                        }
                        actionPosition="left"
                        className={imageGallery.titleBar}
                    />
                    </GridListTile>
                ))}
            </GridList>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {
                    <div style={getModalStyle()} className={butStyle.paper}>
                        <img src={imageData[key].img} alt={imageData[key].title}/>
                    </div>
                }
            </Modal>
        </div>
    );
}

export default ImageGallery;
