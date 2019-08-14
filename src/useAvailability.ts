import { useEffect, useReducer } from "react";
import { AvailabilityRecord, ConnectionStatus } from "./types";


enum ActionType {
    WS_CONNECT_SUCCESS,
    WS_DISCONNECT,
    SET_DATA,
    SET_ERROR
}

type State = {
    wsStatus: ConnectionStatus;
    data: AvailabilityRecord[];
    error: Error | null;
};

type Action = {
    type: ActionType;
    payload: any;
}

const initialState: State = {
    wsStatus: ConnectionStatus.DISCONNECTED,
    data: [],
    error: null,
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.WS_CONNECT_SUCCESS:
            return {
                ...state,
                wsStatus: ConnectionStatus.CONNECTED,
            };
        case ActionType.WS_DISCONNECT:
            return {
                ...state,
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

    useEffect(
        () => {
            const socket = new WebSocket("ws://localhost:8000/ws/status");

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


            };

            const watchId = setInterval(
                () => {
                    socket.send("SEND_DATA_PLZ_KTHXBAI");
                },
                10 * 1000, // 10 seconds
            );

            return () => {
                clearInterval(watchId);
                socket.close();
            };
        },
        []
    );

    return state;
};

export default useAvailability;
