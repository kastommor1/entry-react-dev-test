import React from "react";
import '../../styles/Cart/Product-card-in-cart.css'


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

                    <div className="attributes">
                        {attributes.map((attribute, index) => {
                            // if (index >2){
                            //     return ;
                            // } else if (index === 2) {
                            //     return <button className="details-btn">Show details</button>
                            // }

                            return (
                                <div key={attribute.id}>
                                    <p>{attribute.name}:</p>
                                    <div>
                                        {attribute.items.map(item => {                                            
                                            const selectedClass = item.selected ? ' selected' : '';
                                            const selectedColorClass = item.selected ? ' selected-color' : '';
                                            if (attribute.id === 'Color') {
                                                const whiteClass = item.displayValue.toLocaleLowerCase() === 'white'
                                                    ? ' white-square' : '';
                                                return <button
                                                    className={"color-button" + selectedColorClass + whiteClass}
                                                    key={item.id}                                                    
                                                    >
                                                        <div className="colored-square" style={{ backgroundColor: item.value}}></div>
                                                    </button>
                                            }

                                            return <button
                                                key={item.id}
                                                className={selectedClass}>
                                                {item.displayValue}</button>
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </section>

                <section className="count-picker">
                    <button>+</button>
                    <p>{quantity}</p>
                    <button>-</button>
                </section>

                <section className="gallery">
                    <img src={gallery[0]} alt={name} />
                </section>









                {/* <div className="product-gallery">
                    <img className={imgClass} src={gallery[0]} alt={name} />
                    {!inStock && <p className="product-stock">OUT OF STOCK</p>}
                </div>
                <p className="product-name" >{brand} {name}</p>
                <p><b>{prices[0].currency.symbol}{prices[0].amount}</b></p>

                {inStock && 
                <div>
                    {!quantity ?
                        <button
                            className="add-product-btn"
                            onClick={() => { this.props.onAddToCart(product) }}
                        >
                            <img src={cart} alt="" />
                        </button> :
                        <button
                            className="dell-product-btn"
                            onClick={() => { this.props.onAddToCart(product) }}
                        >
                            <img src={cart} alt="" />
                        </button>}
                </div>} */}

            </div>
        )
    }
}

export default ProductCardInCart;
