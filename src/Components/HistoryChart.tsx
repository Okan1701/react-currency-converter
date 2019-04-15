import React, {Component, FormEvent, ReactNode} from 'react';
import Card from "react-bootstrap/Card";
import Spinner from "./LoadingCard";
import LoadingCard from "./LoadingCard";
import Chart from 'react-google-charts';
import ErrorCard from "./ErrorCard";

export enum HistoryChartMode {
    Empty,
    Loading,
    Loaded,
    Failed
}

interface IHistoryChartProps {
    mode: HistoryChartMode,
    chartData: any
}

class HistoryChart extends Component<IHistoryChartProps, any> {
    constructor(props: any) {
        super(props);
    }

    render() {

        switch (this.props.mode) {
            case HistoryChartMode.Empty:
                return (
                    <Card>
                        <Card.Body>
                            <Card.Title>Statistics</Card.Title>
                            <div className="align-content-center">
                                <br/>
                                <Card.Title><strong>No Data to display in the chart.</strong></Card.Title>
                                <p>When converting a currency value into another currency, this chart will automaticly
                                    be loaded
                                    with information regarding the currency's value in the past week.</p>
                            </div>
                        </Card.Body>
                    </Card>
                );
            case HistoryChartMode.Loading:
                return (<LoadingCard text={"Loading statistics data..."} show={true}/>);
            case HistoryChartMode.Loaded:
                return (
                    <Card>
                        <Card.Body>
                            <Card.Title>Statistics</Card.Title>
                            <Chart
                                chartType="LineChart"
                                loader={<LoadingCard text={"Creating Line Chart..."} show={true}/>}
                                data={this.props.chartData}
                                options={{
                                    title: "Currency value since last week",
                                    hAxis: {
                                        title: 'Date',
                                    },
                                    vAxis: {
                                        title: 'Currency Value',
                                    },
                                }}
                                rootProps={{'data-testid': '1'}}
                            />
                        </Card.Body>
                    </Card>
                );
            case HistoryChartMode.Failed:
                return <ErrorCard text="Failed to retrieve history data!"/>
        }

    }
}

export default HistoryChart