import { useReducer } from "react";
import { AvailabilityRecord } from "./types";


enum ActionType {
    REQUEST_INIT,
    REQUEST_FAILURE,
    REQUEST_SUCCESS,
    WS_CONNECT,
    WS_DISCONNECT,
    SET_DATA
}

type State = {
    loading: boolean;
    data: AvailabilityRecord[];
    wsConnected: boolean;
    error: Error | null;
};

type Action = {
    type: ActionType;
    payload: any;
}

const initialState: State = {
    loading: false,
    data: [],
    wsConnected: false,
    error: null,
};

const reducer = (state: State, action: Action): State => {
    return state;
};

const useAvailability = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return state;
};

export default useAvailability;
