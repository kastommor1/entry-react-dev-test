import React from "react";

//routes
import { Routes, Route, Navigate } from "react-router-dom";
import CategoryHOC from "./routes/Category";
import ProductHOC from "./routes/Product";
import CartPage from "./routes/Cart-page";

//apollo
import { GET_CATEGORIES_NAME_AND_CURRENCIES } from "./apollo-client/queries";
import { client } from "./apollo-client/cache";


//data
import { widthQuery } from "./service-functions/HOCs"
import PropTypes from "prop-types";

//css
import './App.css'

//components
import Header from "./components/Header";
import WarningMessage from "./components/Warning-message";
import Order from "./routes/Order";
import Loading from "./components/Loading";
import Test from "./routes/Test";






class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: false,
      data: false,

      cart: [],
      currentCurrency: ''
    }
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleDeleteFromCart = this.handleDeleteFromCart.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleAttributeChange = this.handleAttributeChange.bind(this);
    this.localStorageUpdated = this.localStorageUpdated.bind(this);
    this.handleSetCurrentCurrency = this.handleSetCurrentCurrency.bind(this);
    this.handleOrder = this.handleOrder.bind(this);

    this.getCategoriesQuery = this.getCategoriesQuery.bind(this);

  }

  handleAddToCart(product, preview) {
    const { id } = product; //
    console.log(product);

    //for old product
    if (this.state.cart.filter(product => product.id === id && product.quantity === 0).length > 0) {
      this.handleQuantityChange(id, true);
      return;
    }

    //for new product  
    let selectedProduct = JSON.parse(JSON.stringify(product)); //
    //set default attributes
    for (let i = 0; i < selectedProduct.attributes.length; i++) {
      selectedProduct.attributes[i].items[0].selected = true;
    }

    selectedProduct.quantity = preview ? 0 : 1;

    this.setState({ cart: [...this.state.cart, selectedProduct] });
    localStorage.setItem('cart', JSON.stringify([...this.state.cart, selectedProduct]));
  }

  handleDeleteFromCart(id) {
    //Delete product
    let filteredCart = this.state.cart.filter((product) => product.id != id);
    this.setState({ cart: filteredCart });
    localStorage.setItem('cart', JSON.stringify(filteredCart));
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
    if (event.key === 'cart' || event.key === 'currentCurrency') {
      if (JSON.parse(localStorage.getItem(event.key))) { //protection against manual cleaning of localStorage
        this.setState({ [event.key]: JSON.parse(localStorage.getItem([event.key])) });
      }
    }
  }

  handleSetCurrentCurrency(label) {
    this.setState({ currentCurrency: label });
    localStorage.setItem('currentCurrency', JSON.stringify(label));
  }

  handleOrder() {
    this.setState({ cart: [] });
    localStorage.setItem('cart', JSON.stringify([]));
  }

  componentDidMount() {
    this.getCategoriesQuery();

    if (typeof window !== 'undefined') {
      if (JSON.parse(localStorage.getItem('cart'))) {
        this.setState({ cart: JSON.parse(localStorage.getItem('cart')) });
      }

      if (JSON.parse(localStorage.getItem('currentCurrency'))) {
        this.setState({ currentCurrency: JSON.parse(localStorage.getItem('currentCurrency')) });
      }

      window.addEventListener('storage', this.localStorageUpdated);
    }
  }


  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', this.localStorageUpdated);
    }
  }

  getCategoriesQuery() {
    client
      .query({
        query: GET_CATEGORIES_NAME_AND_CURRENCIES
      })
      .then(result => { this.setState({ data: result.data }) })
      .catch(error => { this.setState({ error: error }) })
      .finally(() => { this.setState({ loading: false }) });
  }

  render() {   
    // const { loading, error, data } = this.props.query;
    const { loading, error, data } = this.state;

    if(loading) console.log(this.state.loading);
    if(error) console.log(this.state.error);
    if(data) console.log(this.state.data);

    

    if (loading) return <Loading />
    if (error) return <WarningMessage><h2>Error</h2> <p>{error.message}</p></WarningMessage>

    if (!data && !data.categories && data.categories.length === 0) return <WarningMessage><p>No categories</p></WarningMessage>;
    if (!data && !data.currencies && data.currencies.length === 0) return <WarningMessage><p>No currencies</p></WarningMessage>;


    return (
      <>
        <Header
          categoriesName={data.categories}

          cart={this.state.cart}
          onQuantityChange={this.handleQuantityChange}
          onAttributeChange={this.handleAttributeChange}

          currencies={data.currencies}
          currentCurrency={this.state.currentCurrency}
          onSetCurrentCurrency={this.handleSetCurrentCurrency}

          onOrder={this.handleOrder}
        />
        <main>
          <Routes>
            <Route path='*'>
              <Route path='categories/:categoryName' element={
                <CategoryHOC
                  categoriesName={data.categories}
                  cart={this.state.cart}
                  onAddToCart={this.handleAddToCart}
                  onDeleteFromCart={this.handleDeleteFromCart}

                  currentCurrency={this.state.currentCurrency}
                />} />

              <Route path='' element={<Navigate to={'/categories/' + data.categories[0].name} />} />

              <Route path='categories/:categoryName/product/:productId' element={
                <ProductHOC
                  cart={this.state.cart}
                  onAddToCart={this.handleAddToCart}
                  onQuantityChange={this.handleQuantityChange}
                  onAttributeChange={this.handleAttributeChange}
                  onDeleteFromCart={this.handleDeleteFromCart}
                  currentCurrency={this.state.currentCurrency}
                />} />

              <Route path="cart" element={
                <CartPage
                  cart={this.state.cart}
                  onQuantityChange={this.handleQuantityChange}
                  onAttributeChange={this.handleAttributeChange}

                  currencies={data.currencies}
                  currentCurrency={this.state.currentCurrency}

                  onOrder={this.handleOrder}
                />} />


              <Route path="test" element={<Test/>}/>

              <Route path="order" element={<Order />} />

              <Route path='*' element={
                <WarningMessage>
                  <h2>Error 404</h2>
                  <p>Sorry. Page not found.</p>
                </WarningMessage>
              } />
            </Route>
          </Routes>
        </main>
      </>
    )


  }
}

// const AppHOC = widthQuery(App, GET_CATEGORIES_NAME_AND_CURRENCIES);

// export default AppHOC;

export default App;
