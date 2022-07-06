import React from "react";
import "../../styles/product-card/Gallery-stock.css";

class GalleryStock extends React.Component {
    render() {

        const { inStock, gallery, name } = this.props;
        const imgClass = inStock ? '' : 'stock-img';

        return (
            <div className="gallery">
                <img className={imgClass} src={gallery[0]} alt={name} />
                {!inStock && <p className="stock">OUT OF STOCK</p>}
            </div>
        )
    }
}

export default GalleryStock;