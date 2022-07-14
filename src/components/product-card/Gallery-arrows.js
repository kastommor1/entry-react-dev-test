import React from "react";

import "../../styles/product-card/Gallery-arrows.css"
import arrowLeftImg from "../../data/arrow-left.svg";
import arrowRightImg from "../../data/arrow-right.svg";

class GalleryArrows extends React.Component {

    render() {
        const { gallery, imgNumber, onPreviousImage, onNextImage } = this.props;

        if (gallery.length < 2) return undefined;

        return (
            <div className="arrows">
                <div className="arrow">
                    {(imgNumber > 0) &&
                        <button
                            onClick={() => { onPreviousImage() }}>
                            <img src={arrowLeftImg} alt="arrow-left" />
                        </button>
                    }
                </div>
                <div className="arrow">
                    {(gallery.length - 1 > imgNumber) &&
                        <button
                            onClick={() => { onNextImage() }}>
                            <img src={arrowRightImg} alt="arrow-right" />
                        </button>
                    }
                </div>






            </div>
        )
    }
}

export default GalleryArrows;