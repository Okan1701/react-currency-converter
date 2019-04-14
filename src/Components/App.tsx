import React, {Component} from 'react';
import '../css/App.css';
import "../css/logo.svg";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import CurrencyConversion from "./CurrencyConversion";
import {Route, Link, BrowserRouter as Router, Switch} from 'react-router-dom'
import CryptocurrencyList from "./CryptocurrencyList";
import NavLink from "react-bootstrap/NavLink";

interface IAppState {
    navBarBtnState: number
}

class App extends Component<any, IAppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            navBarBtnState: 0
        };
    }

    render(): React.ReactNode {
        return (
            <Router>
                <div className="App">
                    <Navbar variant="dark" expand="lg">
                        <Navbar.Brand as={Link} to="/" onClick={() => {
                            this.setState({navBarBtnState: 0})
                        }}>
                            <img
                                src={"./logo.png"}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            /> Currency Converter</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link as={Link}
                                          to="/"
                                          active={this.state.navBarBtnState === 0}
                                          onClick={() => {
                                              this.setState({navBarBtnState: 0})
                                          }}>
                                    Conversion
                                </Nav.Link>
                                <Nav.Link as={Link}
                                          to="/cryptocurrency"
                                          active={this.state.navBarBtnState === 1}
                                          onClick={() => {
                                              this.setState({navBarBtnState: 1})
                                          }}>
                                    Cryptocurrency
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <br/>
                    <Switch>
                        <Route exact path="/" component={CurrencyConversion}/>
                        <Route path="/cryptocurrency" component={CryptocurrencyList}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
