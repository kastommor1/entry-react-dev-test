import React from "react";
import { widthQuery } from "./HOCs/HOCs"
import { Outlet, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/App/Header";
import PropTypes from "prop-types";
import { GET_CATEGORIES_NAME } from "./apollo-client/queries";
import {setCategoriesName} from './data';
import WarningMessage from "./components/Warning-message";

class App extends React.Component{
  
  // static propTypes = {
  //   query: PropTypes.isRequired
  // }

  render(){
    const {loading, error , data} = this.props.query; 

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error {error.message}</p>

    if(data && data.categories) {
      setCategoriesName(data.categories);
      if (data.categories.length === 0) return  <WarningMessage><p>No categories</p></WarningMessage>; 
      
      return(
        <div>
          <Header categories={data.categories}/>
          <main>
            <Routes>
                <Route path='' element={<Navigate to={'/categories/' + data.categories[0].name} />} />                    
            </Routes>             
            <Outlet/>
          </main>      
        </div>
      )
    }
  }  
}

const AppHOC = widthQuery(App, GET_CATEGORIES_NAME);

export default AppHOC;
