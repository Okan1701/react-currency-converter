import React, {Component, ReactNode} from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {FormGroup} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../Data/CurrencyListData";
import LoadingCard from "./LoadingCard";
import {getCurrencies, ICurrency} from "../Data/CurrencyListData";
import Spinner from "react-bootstrap/Spinner";
import {convertValue, IConversionResult} from "../Data/CurrencyConversion";
import HistoryChart, {HistoryChartMode} from "./HistoryChart";
import {getCurrencyHistoryData} from "../Data/CurrencyHistoryData";

// Define the content and types of the component state
interface ICurrencyConversionState {
    loading: boolean,
    currencies: ICurrency[];
    displayFormValidation: boolean,
    result: string,
    isCalculating: boolean,
    chartMode: HistoryChartMode
    chartData: any
}

class CurrencyConversion extends Component<any, ICurrencyConversionState> {

    constructor(props: any) {
        super(props);
        this.state = {
            loading: true,
            displayFormValidation: false,
            currencies: [{currencyName: "null", id: "null"}],
            result: "",
            isCalculating: false,
            chartMode: HistoryChartMode.Empty,
            chartData: []
        };
    }

    private onFormSubmit(event: any): void {
        const form: HTMLSelectElement = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === true) {
            // Get submitted form data
            const source: string = event.target[0].value;
            const value: number = event.target[1].value;
            const target: string = event.target[2].value;
            this.setState({result: "Calculating...", isCalculating: true, chartMode: HistoryChartMode.Loading});

            // Get data
            convertValue(source, value, target).then((data: IConversionResult) => {
                // Update state by updating the result string and disabling the loading button
                this.setState({
                    isCalculating: false,
                    result: `${data.originalValue} ${data.source} = ${data.calculatedValue} ${data.target}`
                });
            });

            // Load statistics chart
            getCurrencyHistoryData(source, target).then((data) => {
                console.log(data);
                this.setState({
                    chartMode: HistoryChartMode.Loaded, 
                    chartData: data
                });
            });

        }
         else {
            this.setState({displayFormValidation: true});
        }
    }

    componentDidMount(): void {
        getCurrencies().then((data) => this.setState({loading: false, currencies: data}));
    }

    render(): ReactNode {
        let btnCalculate;
        if (this.state.isCalculating) {
            btnCalculate = (
                <Button type="submit" disabled><Spinner as="span" animation="border" size="sm" role="status"
                                                        aria-hidden="true"/> Calculate</Button>
            );
        } else {
            btnCalculate = <Button type="submit">Calculate</Button>
        }

        return (
            <div className="app-content">
                <h1>Main Page</h1>
                <hr/>
                <strong>On this page, you can peform currency conversion!</strong><br/>
                <p>You can choose the source currency with the left dropdown and then choose the target currency with the right dropdown. 
                    When entering a currency value, please ensure that it only contains numbers with 2 decimals max!</p>
                <br/>
                <LoadingCard show={this.state.loading} text="Loading currency data..."/>
                {this.state.loading === false &&
                <Card>
                    <Card.Body>
                        <Card.Title>Conversion</Card.Title>
                        <Form validated={false} onSubmit={(e: any) => {
                            this.onFormSubmit(e)
                        }}>
                            <FormGroup>
                                <Row>
                                    <Col md="2">
                                        <Form.Control as="select">
                                            {this.state.currencies.map((currency: ICurrency) => <option
                                                value={currency.id}>{currency.currencyName}</option>)}
                                        </Form.Control>
                                    </Col>
                                    <Col>
                                        <Form.Control type="number" placeholder="Value to be converted" step=".01"
                                                      required/>
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a valid amount!
                                        </Form.Control.Feedback>
                                    </Col>
                                    <Col md="2">
                                        <Form.Control as="select">
                                            {this.state.currencies.map((currency: ICurrency) => <option
                                                value={currency.id}>{currency.currencyName}</option>)}
                                        </Form.Control>
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col md="2">
                                        {btnCalculate}
                                    </Col>
                                    <Col>
                                        <h4>{this.state.result}</h4>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Form>
                    </Card.Body>
                </Card>
                }
                <br/>
                <HistoryChart mode={this.state.chartMode} chartData={this.state.chartData}/>
            </div>
        );
    }
}

export default CurrencyConversion