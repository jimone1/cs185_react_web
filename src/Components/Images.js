import React, { Component } from 'react';
import ImageGallery from './ImageGallery.js'
// import { SRLWrapper } from 'simple-react-lightbox'  // didn't use
// import Lightbox from 'react-lightbox-component';
// import ImgsViewer from 'react-images-viewer'


class Images extends Component {

    render() {
        return (
            // <div className="image-gallery">
            <ImageGallery />
            // <div className="image-gallery">
            //     {/* <Lightbox images={images} />; */}
            //     <ImgsViewer
            //         imgs={[{ src: DarkRoad1 }, { src: DarkRoad2 }]}
            //         currImg={this.state.currImg}
            //         isOpen={this.state.viewerIsOpen}
            //         onClickPrev={this.gotoPrevious}
            //         onClickNext={this.gotoNext}
            //         onClose={this.closeViewer}
            //     />
            // </div>
            // <div className="image-gallery">
            //     <div className="image"> <img src={DarkRoad1} alt="DarkRoad1"/> </div>
                // <div className="image"> <img src={Solvang} alt="Solvang"/> </div>
                // <div className="image"> <img src={Forest} alt="Forest"/> </div>
                // <div className="image"> <img src={Trees} alt="Trees"/> </div>
                // <div className="image"> <img src={Fields} alt="Fields"/> </div>
                // <div className="image"> <img src={Beach1} alt="Beach1"/> </div>
                // <div className="image"> <img src={Beach2} alt="Beach2"/> </div>
                // <div className="image"> <img src={Beach3} alt="Beach3"/> </div>
                // <div className="image"> <img src={DarkRoad2} alt="DarkRoad2"/> </div>
                // <div className="image"> <img src={JapaneseHouse} alt="JapaneseHouse"/> </div>
                // <div className="image"> <img src={Sky} alt="Sky"/> </div>
                // <div className="image"> <img src={Hallway} alt="Hallway"/> </div>
            // </div>
        );
    }
}

export default Images;