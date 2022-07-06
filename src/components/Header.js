import React from "react";
import { NavLink } from "react-router-dom"
import "../styles/Header.css"
import Cart from "./Cart/Cart";
import logo from "../data/a-logo.svg";
import Currency from "./Currency";

class Header extends React.Component {
    render() {
        return (
            <header>
                <nav>
                    <ul className="nav-links">
                        {this.props.categoriesName.map(
                            category => (
                                <li key={category.name}>
                                    <NavLink
                                        to={'/categories/' + category.name}>
                                        {category.name.toUpperCase()}
                                    </NavLink>
                                </li>
                            ))}
                    </ul>
                </nav>

                <img src={logo} alt="logo" className="logo" />

                <div className="header-icons">
                    <Currency
                        currencies={this.props.currencies}
                        onSetCurrentCurrency={this.props.onSetCurrentCurrency}
                        currentCurrency={this.props.currentCurrency}
                    />

                    <Cart
                        cart={this.props.cart}
                        onQuantityChange={this.props.onQuantityChange}
                        onAttributeChange={this.props.onAttributeChange}
                        currentCurrency={this.props.currentCurrency}
                        currencies={this.props.currencies}

                        onOrder={this.props.onOrder}
                    />
                </div>



            </header>
        )
    }
}


export default Header;