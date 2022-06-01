import React from "react";
import { widthQuery } from "./HOCs/HOCs"
import { Outlet } from "react-router-dom";
import Header from "./components/App/Header";
import PropTypes from "prop-types"
import { GET_CATEGORIES_NAME } from "./apollo-client/queries";

class App extends React.Component{
  
  // static propTypes = {
  //   query: PropTypes.isRequired
  // }

  render(){
    const {loading, error , data} = this.props.query; 

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error {error.message}</p>

    if(data && data.categories) {      
      return(
        <div>
          <Header categories={data.categories}/>
          <main>            
            <Outlet/>
          </main>      
        </div>
      )
    }
  }  
}

const AppHOC = widthQuery(App, GET_CATEGORIES_NAME);

export default AppHOC;
