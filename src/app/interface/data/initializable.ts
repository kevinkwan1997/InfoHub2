export interface Initializable {
    init: () => Promise<InitializableReturnValue>
}

export interface InitializableReturnValue {
    serviceName: string;
    status: boolean;
}
