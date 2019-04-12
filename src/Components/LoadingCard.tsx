import React, {Component, FormEvent, ReactNode} from 'react';
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import CurrencyConversion from "./CurrencyConversion";

interface IProps {
    text: string
    show: boolean
}

class LoadingCard extends Component<IProps,any> {
    constructor(props: IProps) {
        super(props)
    }

    render(): ReactNode {
        if (this.props.show) {
            return (
                <Card className="text-center">
                    <Card.Body>
                        <div className="align-content-center">
                            <Spinner animation="border" variant="primary" text/>
                            <br/>
                            <Card.Title><strong>{this.props.text}</strong></Card.Title>
                        </div>
                    </Card.Body>
                </Card>
            );
        }
        else {
            return (null);
        }
    }
}

export default LoadingCard;