import React from "react";
import "../../styles/product-card/Gallery.css"
import SmallImagesBar from "./Small-images-bar";

class GalleryWithIcons extends React.Component {
    render() {
        const { gallery, name } = this.props;

        return (
            <div className="gallery">

                <SmallImagesBar name={name} gallery={gallery} />

                <div className="cover-image">
                    <img src={gallery[0]} alt={name} />
                </div>

            </div>
        )
    }
}

export default GalleryWithIcons;