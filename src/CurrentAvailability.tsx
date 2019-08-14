import React from "react";
import { AvailabilityRecord } from "./types";

import TimeCounter from "./TimeCounter";

type Props = {
    availability: AvailabilityRecord;
}

const CurrentAvailability = ({availability}: Props) => (
    <article className={`message ${availability.available ? 'is-success' : 'is-danger'}`}>
        <div className="message-header">
            <p>
                {availability.available ? 'Available' : 'Unavailable'}
            </p>
        </div>
        <div className="message-body">
            <TimeCounter start={availability.time}/>
        </div>
    </article>
);

export default CurrentAvailability;
