import React, {Component, ReactNode} from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {FormGroup} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../Data/CurrencyListData";
import {getCurrencies, ICurrency} from "../Data/CurrencyListData";
import Spinner from "react-bootstrap/Spinner";


interface IState {
    loading: boolean,
    currencies: ICurrency[];
}

class CurrencyConversion extends Component<any, IState> {

    constructor(props: any) {
        super(props);
        getCurrencies().then((data) => this.onLoadingComplete(data));
        this.state = {loading: true, currencies: [{currencyName: "null", id: "null"}]}
    }

    private onLoadingComplete(data: ICurrency[]): void {
        this.setState({loading: false, currencies: data});
    }

    render(): ReactNode {
        return (
            <div className="app-content">
                <h1>Main Page</h1>
                <hr/>
                <strong>On this page, you can peform currency conversion!</strong>
                <br/><br/>
                {this.state.loading === true &&
                <Card className="text-center">
                    <Card.Body>
                        <div className="align-content-center">
                            <Spinner animation="border" variant="primary" text/>
                            <br/>
                            <Card.Title><strong>Loading currency data...</strong></Card.Title>
                        </div>
                    </Card.Body>
                </Card>
                }
                {this.state.loading === false &&
                <Card>
                    <Card.Body>
                        <Card.Title>Conversion</Card.Title>
                        <Form>
                            <FormGroup>
                                <Row>
                                    <Col md="2">
                                        <Form.Control as="select">
                                            {this.state.currencies.map((currency: ICurrency) => <option value={currency.id}>{currency.currencyName}</option>)}
                                        </Form.Control>
                                    </Col>
                                    <Col>
                                        <Form.Control placeholder="Value to be converted"/>
                                    </Col>
                                    <Col md="2">
                                        <Form.Control as="select">
                                            {this.state.currencies.map((currency: ICurrency) => <option value={currency.id}>{currency.currencyName}</option>)}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Form>
                    </Card.Body>
                </Card>
                }
            </div>
        );
    }
}

export default CurrencyConversion