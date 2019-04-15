import React, {Component, FormEvent, ReactNode} from 'react';
import CryptoTableList from "./CryptocurrencyOverview";
import {CryptoListSortMode} from "../Data/CryptoListData";

class About extends Component {

    render(): ReactNode {
        return (
            <div app-content>
                <div className="app-content">
                    <h1>About</h1>
                    <hr/>
                    <strong>Purpose</strong>
                    <p>The purpose of this website was to be a learning experience with React. 
                        This is my first serious attempt at building a React website.
                    </p>
                    <br/>
                    <strong>Disclaimer</strong>
                    <p>As already said, this site was mainly for educational purposes. Please do not use this website for actual professionel needs.
                    You will be setting yourself up for disappointment!</p>
                    <br/>
                    <strong>Source code</strong>
                    <p>
                        The source code for this website can be found in my public GitHub repository. <a href="https://github.com/OkanEmeni/react-currency-converter">Click here to go to the repository.</a>
                    </p>
                </div>
            </div>
        );
    }
}

export default About;