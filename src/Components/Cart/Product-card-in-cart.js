import React from "react";
import '../../styles/Cart/Product-card-in-cart.css'
import Attributes from "./Attributes";


class ProductCardInCart extends React.Component {

    render() {
        const product = this.props.product;
        const { id, name, inStock, gallery, prices, brand, quantity, attributes } = product;

        return (
            <div className="product-card-in-cart">

                <section className="parameters">
                    {/* <p className="brand" ></p> */}
                    <h3 className="name" > {brand} <br /> {name}</h3>
                    <p><b>{prices[0].currency.symbol}{prices[0].amount}</b></p>

                    <Attributes attributes={attributes}/>                   

                </section>

                <section className="count-picker">
                    <button>+</button>
                    <p>{quantity}</p>
                    <button>-</button>
                </section>

                <section className="gallery">
                    <img src={gallery[0]} alt={name} />
                </section>     

            </div>
        )
    }
}

export default ProductCardInCart;
