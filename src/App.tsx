import React, { ReactNode } from 'react';
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

import Header from './Header';
import RecentAvailability from "./RecentAvailability";
import CurrentAvailability from "./CurrentAvailability";
import AvailabilityStats from "./AvailabilityStats";
import Footer from "./Footer";

import useAvailability from "./useAvailability";

import { ConnectionStatus } from "./types";

type WrapperProps = {
    children: ReactNode;
    wsStatus: ConnectionStatus;
}
const Wrapper = ({children, wsStatus}: WrapperProps) => (
    <div className="container">
        <Header wsStatus={wsStatus}/>
        <div className="my-main-row">
            {children}
        </div>
        <Footer/>
    </div>
);

const App: React.FC = () => {
    const { data, wsStatus, error } = useAvailability();

    if (wsStatus === ConnectionStatus.DISCONNECTED) {
        return (
            <Wrapper wsStatus={wsStatus}>
                <progress className="progress is-medium is-primary" max="100">15%</progress>
            </Wrapper>
        );
    }

    if (error) {
        return (
            <div className="container">
                <Header wsStatus={wsStatus}/>
                <div className="my-main-row">
                    <article className="message is-danger">
                        <div className="message-header">
                            <p>
                                Error
                            </p>
                        </div>
                        <div className="message-body">
                            {error.message}
                        </div>
                    </article>
                </div>
                <Footer/>
            </div>
        );
    }

    if (!data || 0 === data.length) {
        return (
            <div className="container">
                <Header wsStatus={wsStatus}/>
                <div className="my-main-row">
                    <article className="message is-warning no-data-available-alert">
                        <div className="message-header">
                            <p>
                                Warning
                            </p>
                            <span className="icon">
                                <FontAwesomeIcon icon={faExclamationTriangle}/>
                            </span>
                        </div>
                        <div className="message-body">
                            No data available.
                        </div>
                    </article>
                </div>
                <Footer/>
            </div>
        );
    }

    return (
        <div className="container">
            <Header wsStatus={wsStatus}/>
            <div className="columns my-main-row">
                <div className="column">
                    <RecentAvailability history={data}/>
                </div>
                <div className="column">
                    <CurrentAvailability availability={data[0]}/>
                </div>
            </div>
            <AvailabilityStats/>
            <Footer/>
        </div>
    );
};

export default App;
