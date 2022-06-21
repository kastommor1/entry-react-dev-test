import React from "react";
import WarningMessage from "../components/Warning-message";

class Order extends React.Component{
    render(){
        const order = Math.floor(Math.random() * 1000) + ' ' + Math.floor(Math.random() * 1000);
        return (
        <WarningMessage>
            <h2>Order #{order}</h2>
            <p>Your order has been successfully accepted.</p>
            <p>Wait for the arrival notification.</p>            
        </WarningMessage>)
    }
}

export default Order