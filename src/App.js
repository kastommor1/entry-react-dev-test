import React from "react";

//routes
import { Routes, Route, Navigate } from "react-router-dom";
import CategoryHOC from "./routes/Category";
import ProductHOC from "./routes/Product";
import CartPage from "./routes/Cart-page";

//apollo
import { GET_CATEGORIES_NAME_AND_CURRENCIES } from "./apollo-client/queries";


//data
import { widthQuery } from "./service-functions/HOCs"

//css
import './App.css'

//components
import Header from "./components/Header";
import WarningMessage from "./components/Warning-message";
import Order from "./routes/Order";
import Loading from "./components/Loading";




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
  }

  handleAddToCart(product) {
    const cartProduct = this.state.cart.find(cartProduct => cartProduct.hashID === product.hashID);

    if (cartProduct) {
      this.handleQuantityChange(product.id, true)
    } else {
      const sortedCart = [...this.state.cart, product].sort((a, b) => {
        if (a.id > b.id) return 1;
        if (a.id < b.id) return -1;
        return 0;
      });
      
      this.setState({ cart: sortedCart });
      localStorage.setItem('cart', JSON.stringify(sortedCart));
    }
  }

  handleDeleteFromCart(hashID) {
    //Delete product
    let filteredCart = this.state.cart.filter((product) => product.hashID !== hashID);
    this.setState({ cart: filteredCart });
    localStorage.setItem('cart', JSON.stringify(filteredCart));
  }

  handleQuantityChange(hashID, increase) {
    let deleteProduct = false;

    let filteredCart = this.state.cart.map(product => {
      if (product.hashID === hashID) {
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
    if (deleteProduct) this.handleDeleteFromCart(hashID);
  }

  handleAttributeChange(productId, attributeId, itemId) {
    //change if there is a task to add such a function

    // let filteredCart = JSON.parse(JSON.stringify(this.state.cart));

    // for (let product of filteredCart) {
    //   if (product.id === productId) {

    //     for (const attribute of product.attributes) {
    //       if (attribute.id === attributeId) {

    //         for (const item of attribute.items) {
    //           if (item.id === itemId) {
    //             item.selected = true;
    //           }
    //           else if (item.selected) {
    //             delete item.selected
    //           }
    //         }

    //         break
    //       }
    //     }

    //     break
    //   }
    // }

    // this.setState({ cart: filteredCart });
    // localStorage.setItem('cart', JSON.stringify(filteredCart));
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


  render() {
    const { loading, error, data } = this.props.query;

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

const AppHOC = widthQuery(App, GET_CATEGORIES_NAME_AND_CURRENCIES);

export default AppHOC;
