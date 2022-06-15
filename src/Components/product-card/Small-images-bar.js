import React from "react";
import "../../styles/product-card/Small-images-bar.css"
import arrowUpImg from "../../data/arrow-up.svg";
import arrowDownImg from "../../data/arrow-down.svg";

class SmallImagesBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            start: 0
        }

        this.scrollUp = this.scrollUp.bind(this);
        this.scrollDown = this.scrollDown.bind(this);
    }

    scrollUp() {
        this.setState({
            start: this.state.start - 1
        })
    }

    scrollDown() {
        this.setState({
            start: this.state.start + 1
        })
    }


    render() {
        const { gallery, name } = this.props;
        const start = this.state.start;
        const end = start + 3;

        return (
            <div className="small-images-bar">
                <div className="arrow">
                    {start > 0 &&
                        <button onClick={() => { this.scrollUp() }}>
                            <img src={arrowUpImg} alt="up" />
                        </button>}
                </div>

                <div>
                    {gallery.slice(start, end).map((image, i) => {
                        return (
                            <div className="small-image" key={i}>
                                <img src={image} alt={'small image ' + i + ' ' + name} />
                            </div>)
                    })}
                </div>

                <div className="arrow">
                    {(start < gallery.length - 3) &&
                        <button onClick={() => { this.scrollDown() }}>
                            <img src={arrowDownImg} alt="down" />

                        </button>}
                </div>
            </div>
        )
    }
}

export default SmallImagesBar;