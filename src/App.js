import React from "react";

//routes
import { Routes, Route, Navigate } from "react-router-dom";
import CategoryHOC from "./routes/Category";
import ProductHOC from "./routes/Product";

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
    this.handleDeleteFromCart = this.handleDeleteFromCart.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleAttributeChange = this.handleAttributeChange.bind(this);
    this.localStorageUpdated = this.localStorageUpdated.bind(this);

  }

  handleAddToCart(product, preview) {
    const { id, attributes } = product; //

    //for old product
    if (this.state.cart.filter(product => product.id == id && product.quantity === 0).length > 0) {
      this.handleQuantityChange(id, true);
      return;
    }

    //for new product  
    let selectedProduct = JSON.parse(JSON.stringify(product)); //
    //set default attributes
    for (let i = 0; i < attributes.length; i++) {
      selectedProduct.attributes[i].items[0].selected = true;
    }

    // if (!preview) {
    //   selectedProduct.quantity = 1;
    // }

    selectedProduct.quantity = preview ? 0 : 1;

    if (this.state.cart.filter(product => product.id == id).length > 0) {
      this.handleDeleteFromCart(id)
    } else {
      this.setState({ cart: [...this.state.cart, selectedProduct] });
      localStorage.setItem('cart', JSON.stringify([...this.state.cart, selectedProduct]));
    }


  }

  handleDeleteFromCart(id) {   
    //Delete product
    let filteredCart = this.state.cart.filter((product) => product.id != id);
    this.setState({ cart: filteredCart });   
    localStorage.setItem('cart', JSON.stringify(filteredCart));

    //Delete quantity
    // let filteredCart = JSON.parse(JSON.stringify(this.state.cart));

    // for (let product of filteredCart) {
    //   if (product.id === id) {
    //     product.quantity = 0;
    //     break
    //   }      
    // }   

    // this.setState({ cart: filteredCart });
    // localStorage.setItem('cart', JSON.stringify(filteredCart));
  }

  handleQuantityChange(id, increase) {
    let deleteProduct = false;

    let filteredCart = this.state.cart.map(product => {
      if (product.id === id) {
        let selectedProduct = JSON.parse(JSON.stringify(product));        

        if (!increase && selectedProduct.quantity === 1) {
          deleteProduct = true;
          return selectedProduct
        };

        increase ? selectedProduct.quantity++ : selectedProduct.quantity--;
        return selectedProduct;

      }
      return product;
    });

    this.setState({ cart: filteredCart });
    localStorage.setItem('cart', JSON.stringify(filteredCart));
    if (deleteProduct) this.handleDeleteFromCart(id);
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
    if (event.key === 'cart') {
      if(JSON.parse(localStorage.getItem('cart'))){ //protection against manual cleaning of localStorage
        this.setState({ cart: JSON.parse(localStorage.getItem('cart')) });
      }    
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

                <Route path='categories/:categoryName/product/:productId' element={
                  <ProductHOC
                    cart={this.state.cart}
                    onAddToCart={this.handleAddToCart}
                    onQuantityChange={this.handleQuantityChange}
                    onAttributeChange={this.handleAttributeChange}
                    onDeleteFromCart={this.handleDeleteFromCart}
                     />} />

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
