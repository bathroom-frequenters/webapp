import React from 'react';
import { AvailabilityRecord } from "./types";

type Props = {
    history: AvailabilityRecord[];
}

const RecentAvailability = ({ history }: Props) => (
    <nav className="panel">
        <p className="panel-heading">
            Recent Availability
        </p>
        {
            history.map(item => (
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
