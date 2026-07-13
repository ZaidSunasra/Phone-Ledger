import { add, Duration } from "date-fns"

export const addTime = (duration: Duration, date: Date = new Date()) => {
    return add(date, duration);
}