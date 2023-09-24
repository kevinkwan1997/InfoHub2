export interface ActiveModalParams {
    title: string;
    component: any;
    inputs?: any;
}

export interface ModalComponent {
    [key: string]: any;
    title?: string;
}