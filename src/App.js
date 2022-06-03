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
      this.hendleAddToCart = this.hendleAddToCart.bind(this);

    }

  hendleAddToCart(product){
    const {id, attributes} = product
    // console.log(product);
    console.log(attributes);
    let selectedProduct = {
      id: product.id,
      attributes: []
    };

    for (let i = 0; i < attributes.length; i++) {    
      // selectedProduct.attributes[i] = {
      //   id: product.attributes[i].id,
      //   name: product.attributes[i].name,
      //   type: product.attributes[i].type,
      //   items: [product.attributes[i].items[0]]
      // };

      //Deep copy 1  
      // selectedProduct.attributes[i] = JSON.parse(JSON.stringify(product.attributes[i])) ;             
      // selectedProduct.attributes[i].items = [JSON.parse(JSON.stringify(product.attributes[i].items[0]))];
      // selectedProduct.attributes[i].items[0].selected = true;
      
      //Deep copy 2
      selectedProduct.attributes[i] = structuredClone(product.attributes[i]);          
      selectedProduct.attributes[i].items = [structuredClone(product.attributes[i].items[0])];
      selectedProduct.attributes[i].items[0].selected = true;
      // delete selectedProduct.attributes[i].items[0].selected;            
      
    }
    

    // this.setState({cart: [...this.state.cart, selectedProduct]});    
    this.setState({cart: [selectedProduct]});    
  }  
  
  // static propTypes = {
  //   query: PropTypes.isRequired
  // }


  render() {    
    console.log(this.state.cart[0] && this.state.cart[0].attributes);
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
                  <CategoryHOC categoriesName = {data.categories} onAddToCart = {this.hendleAddToCart}/>} />

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
