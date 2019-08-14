import React, { useEffect, useState } from "react";

import moment, { duration } from "moment";

type Props = {
    start: string;
}

const TimeCounter = ({start}: Props) => {
    const [elapsed, setElapsed] = useState("...");

    useEffect(
        () => {
            const watchId = setInterval(
                () => {
                    // thanks to https://github.com/moment/moment/issues/4333#issuecomment-450423176
                    const startDatetime = moment(start, "YYYY-MM-DDTHH:mm:ssZ");
                    const elapsedDuration = duration(startDatetime.diff(moment()));
                    setElapsed(elapsedDuration.humanize(true));
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
