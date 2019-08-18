import React, { useEffect, useState } from "react";

import moment, { duration } from "moment";

type Props = {
    start: string;
}

const rfcToHuman = (rfc: string): string => {
    // thanks to https://github.com/moment/moment/issues/4333#issuecomment-450423176
    const startDatetime = moment(rfc, "YYYY-MM-DDTHH:mm:ssZ");
    const elapsedDuration = duration(startDatetime.diff(moment()));
    return elapsedDuration.humanize(true);
};

const TimeCounter = ({start}: Props) => {
    const [elapsed, setElapsed] = useState("...");

    useEffect(
        () => {
            const watchId = setInterval(
                () => {
                    setElapsed(rfcToHuman(start));
                },
                250,
            );

            return () => clearInterval(watchId);
        },
        [start],
    );

    return (
        <span>
            {elapsed}
        </span>
    );
};

export default TimeCounter;
