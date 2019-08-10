import React from 'react';
import { AvailabilityRecord } from "./types";

type Props = {
    history: AvailabilityRecord[];
}

// TODO assign classes "has-background-{danger,success}" for history state
const RecentAvailability = ({history}: Props) => (
    <nav className="panel">
        <p className="panel-heading">
            Recent Availability
        </p>
        {
            Array.from({length: 60}).map((_, index) => (
                <div key={index} className="panel-block"></div>
            ))
        }
    </nav>
);

export default RecentAvailability;
