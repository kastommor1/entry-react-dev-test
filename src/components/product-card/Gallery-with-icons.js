import React from "react";
import "../../styles/product-card/Gallery.css"
import SmallImagesBar from "./Small-images-bar";

class GalleryWithIcons extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            imgSrc: this.props.gallery[0]
        }

        this.handleSetCoverImage = this.handleSetCoverImage.bind(this);
    }

    handleSetCoverImage(src){
        this.setState({
            imgSrc: src
        })        
    }

    render() {
        const { gallery, name } = this.props;
        const imgSrc = this.state.imgSrc;

        return (
            <div className="gallery">

                <SmallImagesBar name={name} gallery={gallery} onSetCoverImage={this.handleSetCoverImage} />

                <div className="cover-image">
                    <img src={imgSrc} alt={name} />
                </div>

            </div>
        )
    }
}

export default GalleryWithIcons;