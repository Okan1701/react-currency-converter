import React, {Component, ReactNode} from 'react';
import CryptoTableList from "./CryptoTableList";
import {CryptoListSortMode} from "../Data/CryptoListData";
import ErrorCard from "./ErrorCard";


class CryptocurrencyOverview extends Component {
    render(): ReactNode {
        return (
            <div className="app-content">
                <h1>Cryptocurrency Overview</h1>
                <hr/>
                <strong>On this page, you can see a list of popular currencies.</strong>
                <br/><br/>
                <CryptoTableList title="Top cryptocurrencies by 24H Volume" cryptoSortMode={CryptoListSortMode.DailyVolume} />
                <br/>
                <CryptoTableList title="Top cryptocurrencies by Market Cap" cryptoSortMode={CryptoListSortMode.MarketCap} />
            </div>
        );
    }
}

export default CryptocurrencyOverview