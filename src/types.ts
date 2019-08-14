export type AvailabilityRecord = {
    available: boolean;
    time: string;
}

export enum ConnectionStatus {
    CONNECTED,
    DISCONNECTED,
}
