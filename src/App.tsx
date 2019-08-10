import React from 'react';
import './App.css';

import Header from './Header';
import RecentAvailability from "./RecentAvailability";
import CurrentAvailability from "./CurrentAvailability";
import AvailabilityStats from "./AvailabilityStats";
import Footer from "./Footer";

import useAvailability from "./useAvailability";

const App: React.FC = () => {
    const { data, loading, error, wsConnected } = useAvailability();

    if (loading) {
        return (
            <div className="container">
                <Header wsConnected={wsConnected}/>
                <div className="my-main-row">
                    <progress className="progress is-medium is-primary" max="100">15%</progress>
                </div>
                <Footer/>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <Header wsConnected={wsConnected}/>
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
        if (error) {
            return (
                <div className="container">
                    <Header wsConnected={wsConnected}/>
                    <div className="my-main-row">
                        <article className="message is-warning">
                            <div className="message-header">
                                <p>
                                    Warning
                                </p>
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
    }

    return (
        <div className="container">
            <Header wsConnected={wsConnected}/>
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
