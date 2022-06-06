import React from "react";
import { NavLink } from "react-router-dom"
import  "../../styles/App/Header.css"
import Cart from "../Cart";

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
                </nav>               
                <Cart cart = {this.props.cart}/>                
            </header>
        )
    }
}

export default Header;