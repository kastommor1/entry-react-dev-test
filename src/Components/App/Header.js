import React from "react";
import { NavLink } from "react-router-dom"
import  "../../styles/App/Header.css"

class Header extends React.Component{
    render(){
        return (
            <header>
                <nav>
                    <NavLink to='/category1'>Category 1</NavLink>                                        
                    <NavLink to='/category2'>Category 2</NavLink>                                        
                </nav>                
            </header>
        )
    }
}

export default Header;