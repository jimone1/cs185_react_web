import React, { Component } from 'react';
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

class Images extends Component {
    render() {
        return (
            <div className="image-gallery">
                <div className="image"> <img src={DarkRoad1} alt="DarkRoad1"/> </div>
                <div className="image"> <img src={Solvang} alt="Solvang"/> </div>
                <div className="image"> <img src={Forest} alt="Forest"/> </div>
                <div className="image"> <img src={Trees} alt="Trees"/> </div>
                <div className="image"> <img src={Fields} alt="Fields"/> </div>
                <div className="image"> <img src={Beach1} alt="Beach1"/> </div>
                <div className="image"> <img src={Beach2} alt="Beach2"/> </div>
                <div className="image"> <img src={Beach3} alt="Beach3"/> </div>
                <div className="image"> <img src={DarkRoad2} alt="DarkRoad2"/> </div>
                <div className="image"> <img src={JapaneseHouse} alt="JapaneseHouse"/> </div>
                <div className="image"> <img src={Sky} alt="Sky"/> </div>
                <div className="image"> <img src={Hallway} alt="Hallway"/> </div>
            </div>
        );
    }
}

export default Images;