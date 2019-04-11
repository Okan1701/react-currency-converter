import React, { Component, ReactNode } from 'react';


class CryptocurrencyList extends Component {
    render(): ReactNode {
        return (
            <div className="app-content">
                <h1>Cryptocurrency Page</h1>
                <hr></hr>
                <strong>On this page, you can see a list of populair cryptocurrencies.</strong>
            </div>
        );
    }
}

export default CryptocurrencyList