export enum AlertTypes {
    // eslint-disable-next-line
    success = "success",
    // eslint-disable-next-line
    error = "error",
}

export interface Alert {
    id: string;
    type: AlertTypes;
    message: string;
    timeout?: number;
}
