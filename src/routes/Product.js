import React from "react";

//apollo, router
import { GET_PRODUCT } from "../apollo-client/queries";
import { widthProductQueryByParams } from "../service-functions/HOCs"

//component
import WarningMessage from "../components/Warning-message";
import Price from "../components/product-card/Price";
import Attributes from "../components/product-card/Attributes";
import AddButtonBig from "../components/product-card/Add-button-big";

//style
import '../styles/product-card/Product.css'
import GalleryWithIcons from "../components/product-card/Gallery-with-icons";
import Loading from "../components/Loading";


class Product extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            product: null,
            error: false,
            loading: false
        };

        this.getProductQuery = this.getProductQuery.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.handleAttributeChange = this.handleAttributeChange.bind(this);

    }

    getProductQuery() {
        const { query, cart, productId } = this.props;

        //Get start product from Qery or Cart        
        if (!this.state.product) {
            //Check product in cart            
            const cartProduct = cart.find(product => product.id === productId);

            //Get start product from Cart 
            if (cartProduct) {                
                this.setState({ product: cartProduct })
            }
            //Get start product from Qery            
            else {                
                const { loading, error, data } = query;

                if (loading) this.setState({ loading: true });
                if (error) this.setState({
                    loading: false,
                    error: error.message,
                });

                if (!data || !data.product) {
                    this.setState({
                        loading: false,
                        error: 'This product does not exist.',
                    });
                } else {
                    this.setState({
                        loading: false,
                        product: setHashId(setDefaultAttributtes(data.product)),
                    })
                }
            }
        }
    }

    setDescription() {
        if (this.state.product) {
            let descriptionDOM = document.querySelector('.description');
            descriptionDOM.innerHTML = this.state.product.description;
        }
    }

    handleAttributeChange(attributeId, itemId) {       
        let product = JSON.parse(JSON.stringify(this.state.product));

        for (const attribute of product.attributes) {
            if (attribute.id === attributeId) {

                for (const item of attribute.items) {
                    if (item.id === itemId) {
                        item.selected = true;
                    }
                    else if (item.selected) {
                        delete item.selected
                    }
                }

                break
            }
        }        

        this.setState({ product: setHashId(product) });
    }


    componentDidUpdate() {
        this.getProductQuery();
        this.setDescription(); //or use html-react-parser library
    }


    render() {
        if (this.state.loading) return (<Loading />);
        if (this.state.error) {
            return (
                <WarningMessage>
                    <h2>Error.</h2>
                    <p>{this.state.error}</p>
                </WarningMessage>);
        }        

        if (!this.state.product) return (<div></div>);       

        const { id, name, gallery, prices, brand,  attributes } = this.state.product;
        document.title = brand + ' ' + name;

        return (
            <div className="product">

                <GalleryWithIcons gallery={gallery} name={name} />

                <div className="wrapper">
                    <div className="parameters">

                        <h3 className="brand" ><b>{brand}</b></h3>
                        <p className="name" >{name}</p>

                        <Attributes
                            productId={id}
                            attributes={attributes}
                            onAttributeChange={this.handleAttributeChange}
                        />

                        <p className="price-name">Price:</p>
                        <Price prices={prices} currentCurrency={this.props.currentCurrency} />

                        <AddButtonBig                           
                            cart = {this.props.cart}                          
                            product={this.state.product}
                            onAddToCart={this.props.onAddToCart}
                            onDeleteFromCart={this.props.onDeleteFromCart}
                        />

                        <div className="description"></div>
                    </div>
                </div>
            </div>
        )

    }
}


function setDefaultAttributtes(product) {
    //deep copy 
    let selectedProduct = JSON.parse(JSON.stringify(product));
    //set default attributes
    for (let i = 0; i < selectedProduct.attributes.length; i++) {
        selectedProduct.attributes[i].items[0].selected = true;
    }

    selectedProduct.quantity =  1;

    return selectedProduct;
}

function setHashId(product) {
    //deep copy 
    let selectedProduct = JSON.parse(JSON.stringify(product));

    //set hash id
    selectedProduct.hashID = 'id=' + selectedProduct.id + '/attributes';
    for (let i = 0; i < selectedProduct.attributes.length; i++) {

        //set attribute id
        const attribute = selectedProduct.attributes[i];
        selectedProduct.hashID = selectedProduct.hashID + '/' + attribute.id + '=';

        //set selected item id
        for (let i = 0; i < attribute.items.length; i++) {
            if (attribute.items[i].selected) {
                selectedProduct.hashID = selectedProduct.hashID + attribute.items[i].id;
            }
        }
    }

    return selectedProduct;
}


const ProductHOC = widthProductQueryByParams(Product, GET_PRODUCT, 'productId');

export default ProductHOC;