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
        selectedProducts: []
      }
      this.hendleAddToCard = this.hendleAddToCard.bind(this);

    }

  hendleAddToCard(id){
    console.log(id);
    this.setState({selectedProducts: [...this.state.selectedProducts, id]});    
  }  
  
  // static propTypes = {
  //   query: PropTypes.isRequired
  // }


  render() {    
    console.log(this.state.selectedProducts);
    const { loading, error, data } = this.props.query;

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error {error.message}</p>

    if (data && data.categories) {
      // this.setState({categoriesName: data.categories}); //state in state, endless cycle
      // if(this.state.categoriesName.length === 0) this.setState({categoriesName: data.categories}); //state in state     

      if (data.categories.length === 0) return <WarningMessage><p>No categories</p></WarningMessage>;

      

      return (
        <div>
          <Header categoriesName={data.categories} />
          <main>
            <Routes>
              <Route path='*'>
                <Route path='categories/:categoryName' element={
                  <CategoryHOC categoriesName = {data.categories} onAddToCard = {this.hendleAddToCard}/>} />

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
