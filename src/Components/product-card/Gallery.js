import React from "react";
import "../../styles/product-card/Gallery.css"

class Gallery extends React.Component {
    render() {
        return (
            <div className="gallery">
                <img src={this.props.gallery[0]} alt={this.props.name} />
            </div>
        )
    }
}

export default Gallery;