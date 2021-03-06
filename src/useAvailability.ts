import { useCallback, useEffect, useReducer } from "react";
import { DataPackage, ConnectionStatus } from "./types";

enum ActionType {
    WS_CONNECT_SUCCESS,
    WS_DISCONNECT,
    SET_DATA,
    SET_ERROR
}

type State = {
    wsStatus: ConnectionStatus;
    data: DataPackage | null;
    error: Error | null;
};

type Action = {
    type: ActionType;
    payload: any;
}

const initialState: State = {
    wsStatus: ConnectionStatus.DISCONNECTED,
    data: null,
    error: null,
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.WS_CONNECT_SUCCESS:
            return {
                ...state,
                error: null,
                wsStatus: ConnectionStatus.CONNECTED,
            };
        case ActionType.WS_DISCONNECT:
            return {
                ...state,
                error: new Error("Disconnected from server!"),
                wsStatus: ConnectionStatus.DISCONNECTED,
            };
        case ActionType.SET_DATA:
            return {
                ...state,
                data: action.payload,
            };
        case ActionType.SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            throw new Error(`Received unidentified action: ${action.type}`)
    }
};

const useAvailability = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const connect = useCallback(
        () => {
            const socket = new WebSocket(process.env.REACT_APP_API_URL!);

            socket.onopen = (evt) => {
                dispatch({
                    type: ActionType.WS_CONNECT_SUCCESS,
                    payload: null,
                });
            };

            socket.onerror = (evt) => {
                dispatch({
                    type: ActionType.SET_ERROR,
                    payload: new Error("Something went wrong!"),
                });
            };

            socket.onmessage = (evt) => {
                if (typeof evt.data === "string") {
                    console.log(JSON.parse(evt.data));

                    dispatch({
                        type: ActionType.SET_DATA,
                        payload: JSON.parse(evt.data),
                    });
                }
            };

            socket.onclose = (evt) => {
                dispatch({
                    type: ActionType.WS_DISCONNECT,
                    payload: null,
                });

                // Attempt to auto-reconnect
                clearInterval(watchId);
                socket.close();

                // Wait for 5 seconds before reconnecting
                setTimeout(
                    () => connect(),
                    5000
                );
            };

            const watchId = setInterval(
                () => {
                    socket.send("SEND_DATA_PLZ_KTHXBAI");
                },
                30 * 1000, // 30 seconds
            );

            return () => {
                clearInterval(watchId);
                socket.close();
            };
        },
        []
    );

    // Create initial connection
    useEffect(
        () => connect(),
        [connect]
    );

    return state;
};

export default useAvailability;
