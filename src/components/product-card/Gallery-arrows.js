import React from "react";

import "../../styles/product-card/Gallery-arrows.css"
import arrowLeftImg from "../../data/arrow-left.svg";
import arrowRightImg from "../../data/arrow-right.svg";

class GalleryArrows extends React.Component {

    render() {
        return (
            <div className="arrows">
                <button
                    onClick={() => {this.props.onPreviousImage()}}>
                    <img src={arrowLeftImg} alt="arrow-left" />
                </button>

                <button
                    onClick={() => {this.props.onNextImage()}}>
                    <img src={arrowRightImg} alt="arrow-right" />
                </button>
            </div>
        )
    }
}

export default GalleryArrows;