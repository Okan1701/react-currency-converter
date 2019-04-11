import React, {Component} from 'react';
import './App.css';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import CurrencyConversion from "./CurrencyConversion";
import {Route, Link, BrowserRouter as Router, Switch} from 'react-router-dom'
import CryptocurrencyList from "./CryptocurrencyList";
import NavLink from "react-bootstrap/NavLink";

interface IState {
    route: string
}

interface IProps {
    location: string
}

class App extends Component<any, IState> {
    constructor(props: any) {
        super(props)
        this.state = {route: "/"};
    }
    
    render(): React.ReactNode {
        return (
            <Router>
                <div className="App">
                    <Navbar variant="dark" expand="lg">
                        <Navbar.Brand href="#home">Currency Converter</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link as={Link} to="/">Conversion</Nav.Link>
                                <Nav.Link as={Link} to="/cryptocurrency">Cryptocurrency</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <br></br>
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
