import React from "react";

import { widthQuery } from "./HOCs/apolloHOCs"

import { Outlet } from "react-router-dom";

import Header from "./components/App/Header";

class App extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    
    return(
      <div>
        <Header/>
        <main>
          <Outlet/>
        </main>      
      </div>
    )
  }
}

const AppHOC = widthQuery(App);

export default AppHOC;
