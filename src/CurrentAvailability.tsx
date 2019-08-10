import React from "react";
import { AvailabilityRecord } from "./types";

type Props = {
    availability: AvailabilityRecord;
}

const CurrentAvailability = ({availability}: Props) => (
    <article className="message is-success">
        <div className="message-header">
            <p>
                Available
            </p>
        </div>
        <div className="message-body">
            Last updated 34 seconds ago.
        </div>
    </article>
);

export default CurrentAvailability;
