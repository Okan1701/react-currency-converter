import React, {Component, ReactNode} from 'react';
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import {CryptoListSortMode, getCryptoList, getImageUrl, ICryptoCurrency} from "../Data/CryptoListData";
import LoadingCard from "./LoadingCard";

interface ICryptoTableListState {
    loadingState: LoadingState
    cryptoCurrencies: ICryptoCurrency[],
    errorMsg: string
}

interface ICryptoTableListProps {
    cryptoSortMode: CryptoListSortMode,
    title: string
}

class CryptoTableList extends Component<ICryptoTableListProps, ICryptoTableListState> {
    constructor(props: ICryptoTableListProps) {
        super(props);
        this.state = {
            loadingState: LoadingState.Loading,
            cryptoCurrencies: [],
            errorMsg: "null"
        }
    }

    componentDidMount(): void {
        getCryptoList(this.props.cryptoSortMode).then(
            (data: ICryptoCurrency[]) => {
                this.setState({
                    loadingState: LoadingState.Loaded,
                    cryptoCurrencies: data
                });
            },
            (reason) => {
                this.setState({
                    loadingState: LoadingState.Failed,
                    errorMsg: reason
                });
            }
        );
    }

    render(): ReactNode {
        switch (this.state.loadingState) {
            case LoadingState.Loading:
                return <LoadingCard text={this.state.errorMsg} show={true}/>;
            case LoadingState.Loaded:
                return (
                    <Card>
                        <Card.Body>
                            <Card.Title>{this.props.title}</Card.Title>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Icon</th>
                                    <th>Name</th>
                                    <th>Full Name</th>
                                    <th>Value</th>
                                    <th>Proof Type</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.cryptoCurrencies.map((element) => {
                                        return (
                                            <tr>
                                                <td><img src={getImageUrl(element.imageUrl)} width="30" height="30" alt="crypto icon"/></td>
                                                <td>{element.name}</td>
                                                <td>{element.fullName}</td>
                                                <td>{element.value}</td>
                                                <td>{element.proofType}</td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                );
                
            case LoadingState.Failed:
                return <strong>Failed to load data!</strong>
        }
    }
}

enum LoadingState {
    Loading,
    Loaded,
    Failed
}

export default CryptoTableList