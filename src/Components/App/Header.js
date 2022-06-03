import React from "react";
import { NavLink } from "react-router-dom"
import  "../../styles/App/Header.css"

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
                <p>In the cart: <b>{this.props.cart.length}</b></p>                
            </header>
        )
    }
}

export default Header;