import React from "react";
import { NavLink } from "react-router-dom"
import  "../../styles/App/Header.css"

class Header extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <header>
                <nav>
                    <NavLink to='/categories/category1'>Category 1</NavLink>                                        
                    <NavLink to='/categories/category2'>Category 2</NavLink>
                    {this.props.categories.map(
                        category=><NavLink 
                            to={'/categories/'+category.name}>
                            {category.name.toUpperCase()}
                            </NavLink>
                            )}                                        
                </nav>                
            </header>
        )
    }
}

export default Header;