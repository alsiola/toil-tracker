import React, { useEffect, useState, useMemo } from "react";
import { CurrentToil_currentToil } from "../views/__generated__/CurrentToil";
import * as date from "date-fns";

export const ViewToil: React.FC<{ toil: CurrentToil_currentToil }> = ({
    toil
}) => {
    const [x, set] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => set(x + 1), 1000);

        return () => clearInterval(interval);
    });

    const start = useMemo(() => new Date(toil.start), [toil]);
    const now = new Date();

    const hours = date.differenceInHours(now, start);
    const minutes = date.differenceInMinutes(now, date.addHours(start, hours));
    const seconds = date.differenceInMinutes(
        now,
        date.addHours(date.addMinutes(start, minutes), hours)
    );
    console.log({ x, hours, minutes, seconds });

    return (
        <div>
            Your current toil is
            {hours} hours,
            {minutes} minutes,
            {seconds} seconds,
        </div>
    );
};
