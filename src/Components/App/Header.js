import React from "react";
import { NavLink } from "react-router-dom"
import  "../../styles/App/Header.css"

class Header extends React.Component{
    render(){
        return (
            <header>
                <nav>
                    {this.props.categories.map(
                        category=>(
                        <NavLink 
                            to={'/categories/'+category.name} 
                            key={category.name}>
                            {category.name.toUpperCase()}
                        </NavLink>
                        ))}                                        
                </nav>                
            </header>
        )
    }
}

export default Header;