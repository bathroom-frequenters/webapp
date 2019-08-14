import React from 'react';
import { AvailabilityRecord } from "./types";
import TimeCounter from "./TimeCounter";

type Props = {
    history: AvailabilityRecord[];
    latest: AvailabilityRecord;
}

const RecentAvailability = ({ history, latest }: Props) => (
    <nav className="panel recent-availability-panel">
        <p className="panel-heading has-text-centered">
            Recent Availability
        </p>
        <div className="panel-block">
            <article className={`message current-availability-message ${latest.available ? 'is-success' : 'is-danger'}`}>
                <div className="message-body">
                    Currently <strong>{latest.available ? 'available' : 'unavailable'}</strong>.{' '}
                    Last seen <TimeCounter start={latest.time}/>.
                </div>
            </article>
        </div>
        {
            history.slice(1).map(item => (
                <React.Fragment key={item.time}>
                    {item.available === true && (
                        <div className="panel-block has-background-success"/>
                    )}
                    {item.available === false && (
                        <div className="panel-block has-background-danger"/>
                    )}
                    {item.available === null && (
                        <div className="panel-block"/>
                    )}
                </React.Fragment>
            ))
        }
    </nav>
);

export default RecentAvailability;
