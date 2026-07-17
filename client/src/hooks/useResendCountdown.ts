import { useEffect, useState } from "react";

export function useResendCountdown(resendAvailableAt: number | null) {

    const [now, setNow] = useState(Date.now())

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const expiresAt = resendAvailableAt
        ? new Date(resendAvailableAt).getTime()
        : 0;

    const secondsLeft = Math.max(
        0,
        Math.ceil((expiresAt - now) / 1000)
    );

    return {
        secondsLeft,
        canResend: secondsLeft === 0,
    };
}