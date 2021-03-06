import React from "react";
import "../../styles/product-card/Gallery.css"


import GalleryArrows from "./Gallery-arrows";

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgNumber: 0
        }

        this.handleNextImage = this.handleNextImage.bind(this);
        this.handlePreviousImage = this.handlePreviousImage.bind(this);
    }

    handleNextImage() {
        this.setState({
            imgNumber: this.state.imgNumber + 1
        })    
    }

    handlePreviousImage() {
        this.setState({
            imgNumber: this.state.imgNumber - 1
        })  
    }

    render() {
        const { gallery } = this.props;
        const imgSrc = gallery[this.state.imgNumber];

        return (
            <div className="gallery">
                <img src={imgSrc} alt={this.props.name} />

                {this.props.showGalleryArrows &&

                    <GalleryArrows                        
                        gallery={gallery}
                        imgNumber={this.state.imgNumber}
                        onNextImage={this.handleNextImage}
                        onPreviousImage={this.handlePreviousImage}
                    />
                }
            </div>
        )
    }
}

export default Gallery;
