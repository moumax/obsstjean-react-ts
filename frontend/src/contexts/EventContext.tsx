import { createContext, useMemo, useState } from "react";

export interface Ievent {
    id: number;
}

const CurrentEventContext = createContext("default value");

export function CurrentEventContextProvider({ children }) {
    const [event, setEvent] = useState<Ievent[]>([]);

    const value = useMemo(
        () => ({
        event,
        setEvent
    }),
    [event, setEvent]
    );
    return (
        <CurrentEventContext.Provider value={value}>
            {children}
        </CurrentEventContext.Provider>
    )
}

export default CurrentEventContext;