import React, {Component, FormEvent, ReactNode} from 'react';
import Card from "react-bootstrap/Card";


interface IProps {
    text: string
}

class ErrorCard extends Component<IProps,any> {
    constructor(props: IProps) {
        super(props)
    }

    render(): ReactNode {
        return (
            <Card className="text-center">
                <Card.Body>
                    <div className="align-content-center">
                        <img src={"./error.png"} alt="Error Icon" />
                        <br/>
                        <Card.Title><strong>{this.props.text}</strong></Card.Title>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

export default ErrorCard;