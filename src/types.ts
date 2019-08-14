export type AvailabilityRecord = {
    available: boolean;
    time: string;
}

export enum ConnectionStatus {
    CONNECTED,
    DISCONNECTED,
}

export type DataPackage = {
    latest: AvailabilityRecord;
    recent: AvailabilityRecord[];
}
