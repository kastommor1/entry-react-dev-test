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
        this.selectCurrency = this.selectCurrency.bind(this);
    }

    handleToggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    selectCurrency(label) {
        this.props.onSetCurrentCurrency(label);
        this.setState({ showModal: !this.state.showModal });
    }



    render() {
        const { currencies, currentCurrency, onSetCurrentCurrency } = this.props;

        if (currentCurrency === '') {
            onSetCurrentCurrency(currencies[0].label); //default currency
        }

        const currentSymbol = currencies.find(currency => currency.label === currentCurrency).symbol

        return (
            <div className="currency">

                <button
                    className="header-icon"
                    onClick={this.handleToggleModal}
                >
                    {currentSymbol}
                </button>

                <Modal
                    onToggleModal={this.handleToggleModal}
                    showModal={this.state.showModal}
                >
                    <div className="currency-list">
                        {currencies.map(currency => {
                            if (currency.label === 'RUB') return;

                            return (
                                <button
                                    key={currency.label}
                                    onClick={() => { this.selectCurrency(currency.label) }}
                                    className={currency.label === currentCurrency ? 'current-currency' : ''}
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