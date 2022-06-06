import React from "react";
import { NavLink } from "react-router-dom"
import  "../../styles/App/Header.css"
import Cart from "../Cart";
// import "../../data/";


class Header extends React.Component{
    render(){        
        return (
            <header>
                <nav>
                    {this.props.categoriesName.map(
                        category=>(
                        <NavLink 
                            to={'/categories/'+category.name} 
                            key={category.name}>
                            {category.name.toUpperCase()}
                        </NavLink>
                        ))}
                        
                    <img src={require("../../data/a-logo.png")} alt="logo"  className="logo"/>           

                    <button>$</button>                                   
                    <Cart cart = {this.props.cart}/>
                                                              
                </nav>               
             
            </header>
        )
    }
}

export default Header;