import React from "react";
import { NavLink } from "react-router-dom"
import  "../../styles/App/Header.css"
import Cart from "../Cart";
import logo from "../../data/a-logo.svg";

class Header extends React.Component{
    render(){        
        return (
            <header>
                <nav>
                    <ul className="nav-links">
                        {this.props.categoriesName.map(
                            category=>(
                            <li key={category.name}>
                                <NavLink 
                                to={'/categories/'+category.name}> 
                                    {category.name.toUpperCase()}
                                </NavLink>
                            </li>
                            ))}                           
                    </ul>                                       
                </nav>
                
                <img src={logo} alt="logo"  className="logo"/>
                
                <button className="cta">$</button>                                   
                <Cart className="cta" cart = {this.props.cart}/>               
             
            </header>
        )
    }
}


export default Header;