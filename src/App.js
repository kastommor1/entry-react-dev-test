import React from "react";

//routes
import { Routes, Route, Navigate } from "react-router-dom";
import CategoryHOC from "./routes/Category";

//apollo
import { GET_CATEGORIES_NAME } from "./apollo-client/queries";

//data
import { widthQuery } from "./service-functions/HOCs"
import PropTypes from "prop-types";

//components
import Header from "./components/Header";
import WarningMessage from "./components/Warning-message";

//css
import './App.css'
import { productWithAttributes } from "./service-functions/data-processing";


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categoriesName: [],
      cart: [],
    }
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleDelliteFromCart = this.handleDelliteFromCart.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleAttributeChange = this.handleAttributeChange.bind(this);
    this.localStorageUpdated = this.localStorageUpdated.bind(this);

  }

  handleAddToCart(product, withAttributes) {
    const { id, attributes } = product;
    let selectedProduct = structuredClone(product);
    selectedProduct.quantity = 1;

    if (!withAttributes) {
      //set default attributes
      for (let i = 0; i < attributes.length; i++) {
        selectedProduct.attributes[i].items[0].selected = true;
      }
    }

    if (this.state.cart.filter(product => product.id == id).length > 0) {
      this.handleDelliteFromCart(id)
    } else {
      this.setState({ cart: [...this.state.cart, selectedProduct] });
      localStorage.setItem('cart', JSON.stringify([...this.state.cart, selectedProduct]));
    }
  }

  handleDelliteFromCart(id) {
    let filteredCart = this.state.cart.filter((product) => product.id != id);
    this.setState({ cart: filteredCart });
    localStorage.setItem('cart', JSON.stringify(filteredCart));
  }

  handleQuantityChange(id, increase) {
    let dellProduct = false;

    let filteredCart = this.state.cart.map(product => {
      if (product.id === id) {
        let selectedProduct = structuredClone(product);

        if (!increase && selectedProduct.quantity === 1) {
          dellProduct = true;
          return selectedProduct
        };

        increase ? selectedProduct.quantity++ : selectedProduct.quantity--;
        return selectedProduct;

      }
      return product;
    });

    this.setState({ cart: filteredCart });
    localStorage.setItem('cart', JSON.stringify(filteredCart));
    if (dellProduct) this.handleDelliteFromCart(id);
  }

  handleAttributeChange(productId, attributeId, itemId) {
    let filteredCart = JSON.parse(JSON.stringify(this.state.cart));

    for (let product of filteredCart) {
      if (product.id === productId) {

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
        
        break
      }
    }

    this.setState({ cart: filteredCart });
    localStorage.setItem('cart', JSON.stringify(filteredCart));
  }

  localStorageUpdated(event) {  
    if(event.key === 'cart'){
      this.setState({ cart: JSON.parse(localStorage.getItem('cart')) });    
    }    
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      if (JSON.parse(localStorage.getItem('cart'))) {
        this.setState({ cart: JSON.parse(localStorage.getItem('cart')) });
      }
      window.addEventListener('storage', this.localStorageUpdated);      
    }    
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', this.localStorageUpdated);
    }
  }

  render() {
    const { loading, error, data } = this.props.query;

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error {error.message}</p>

    if (data && data.categories) {
      if (data.categories.length === 0) return <WarningMessage><p>No categories</p></WarningMessage>;

      return (
        <>
          <Header
            categoriesName={data.categories}
            cart={this.state.cart}
            onQuantityChange={this.handleQuantityChange}
            onAttributeChange={this.handleAttributeChange}
          />
          <main>
            <Routes>
              <Route path='*'>
                <Route path='categories/:categoryName' element={
                  <CategoryHOC
                    categoriesName={data.categories}
                    cart={this.state.cart}
                    onAddToCart={this.handleAddToCart}
                  />} />

                <Route path='' element={<Navigate to={'/categories/' + data.categories[0].name} />} />

                <Route path='*' element={
                  <WarningMessage>
                    <h2>404</h2>
                    <p>Page not found</p>
                  </WarningMessage>
                } />
              </Route>
            </Routes>
          </main>
        </>
      )
    }
  }
}

const AppHOC = widthQuery(App, GET_CATEGORIES_NAME);

export default AppHOC;
