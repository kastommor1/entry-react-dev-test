import React from "react";

//routes
import { Routes, Route, Navigate } from "react-router-dom";
import CategoryHOC from "./routes/Category";

//apollo
import { GET_CATEGORIES_NAME } from "./apollo-client/queries";

//data
import { widthQuery } from "./HOCs/HOCs"
import PropTypes from "prop-types";

//components
import Header from "./components/Header";
import WarningMessage from "./components/Warning-message";

//css
import './App.css'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categoriesName: [],
      cart: [],
    }
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.hendleDelliteFromCart = this.hendleDelliteFromCart.bind(this);
    this.hendleQuantityChange = this.hendleQuantityChange.bind(this);

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
      this.hendleDelliteFromCart(id)
    } else {
      this.setState({ cart: [...this.state.cart, selectedProduct] });
    }
  }

  hendleDelliteFromCart(id) {
    let filteredCard = this.state.cart.filter((product) => product.id != id);
    this.setState({ cart: filteredCard });
  }

  hendleQuantityChange(id, increase) {
    let dellProduct = false;

    let filteredCard = this.state.cart.map(product=>{
      if(product.id === id){
        let selectedProduct = structuredClone(product);
        
        if(!increase && selectedProduct.quantity === 1) {
          dellProduct = true;
          return selectedProduct
        };

        increase ? selectedProduct.quantity++ : selectedProduct.quantity-- ;          
        return selectedProduct;

      }        
      return product;
    });
    
    this.setState({ cart: filteredCard });
    if (dellProduct) this.hendleDelliteFromCart(id);  
  }



  componentDidMount() {
    this.setState({ cart: JSON.parse(localStorage.getItem('cart')) });
  }

  componentDidUpdate() {
    localStorage.setItem('cart', JSON.stringify(this.state.cart));
  }



  render() {
    // console.log(this.state.cart[0] && this.state.cart[0].attributes);
    // console.log(this.state.cart);
    const { loading, error, data } = this.props.query;

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error {error.message}</p>

    if (data && data.categories) {
      // this.setState({categoriesName: data.categories}); //state in state, endless cycle
      // if(this.state.categoriesName.length === 0) this.setState({categoriesName: data.categories}); //state in state     

      if (data.categories.length === 0) return <WarningMessage><p>No categories</p></WarningMessage>;

      return (
        <>
          <Header
            categoriesName={data.categories}
            cart={this.state.cart}
            onQuantityChange={this.hendleQuantityChange}
          />
          <main>
            <Routes>
              <Route path='*'>
                <Route path='categories/:categoryName' element={
                  <CategoryHOC
                    categoriesName={data.categories}
                    onAddToCart={this.handleAddToCart}
                    cart={this.state.cart} />} />

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
