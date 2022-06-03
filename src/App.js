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
import Header from "./components/App/Header";
import WarningMessage from "./components/Warning-message";


class App extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        categoriesName: [],
        cart: [],  
      }
      this.handleAddToCart = this.handleAddToCart.bind(this);
      this.hendleDelliteFromCart = this.hendleDelliteFromCart.bind(this);

    }

  handleAddToCart(product, withAttributes){
    const {id, attributes} = product;
    let selectedProduct = structuredClone(product);
    selectedProduct.quantity = 1;
    
    if(!withAttributes){  
      //set default attributes
      for (let i = 0; i < attributes.length; i++) {   
        selectedProduct.attributes[i].items[0].selected = true;                 
      }
    }    
    
    if(this.state.cart.filter(product=>product.id == id ).length > 0){
      this.hendleDelliteFromCart(id)
    } else{
      this.setState({cart: [...this.state.cart, selectedProduct]});
    }         
  }

  hendleDelliteFromCart(id){
    let filteredCard = this.state.cart.filter((product)=>product.id != id);
    this.setState({cart: filteredCard});    
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
        <div>
          <Header categoriesName={data.categories} cart={this.state.cart} />
          <main>
            <Routes>
              <Route path='*'>
                <Route path='categories/:categoryName' element={
                  <CategoryHOC categoriesName = {data.categories} onAddToCart = {this.handleAddToCart} cart={this.state.cart}/>} />

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
        </div>
      )
    }
  }
}

const AppHOC = widthQuery(App, GET_CATEGORIES_NAME);

export default AppHOC;
