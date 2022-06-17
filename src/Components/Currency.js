import React from "react";
import Modal from "./Modal";
import "../styles/Currency.css"

class Currency extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
        this.handleToggleModal = this.handleToggleModal.bind(this);
    }

    handleToggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }



    render() {
        const { currencies, currentCurrency, onSetCurrentCurrency } = this.props;
        // console.log(currencies, currentCurrency);
        if (currentCurrency === '') {
            onSetCurrentCurrency(currencies[0].label);
        }

        const currentSymbol = currencies.find(currency => currency.label === currentCurrency).symbol

        return (
            <div className="currency">


                <div onClick={this.handleToggleModal} className="currency-icon">
                    <button
                        className="header-icon"
                        onClick={this.handleToggleModal}
                    >
                        {currentSymbol}
                    </button>
                </div>




                <Modal
                    onToggleModal={this.handleToggleModal}
                    showModal={this.state.showModal}
                >
                    <div className="currency-list">
                        {currencies.map(currency => {
                            return (
                                <button
                                    key={currency.label}
                                    className=""
                                    
                                >
                                    {currency.symbol} {currency.label}
                                </button>
                            )
                        })}
                    </div>

                </Modal>

            </div>
        )
    }
}

export default Currency;