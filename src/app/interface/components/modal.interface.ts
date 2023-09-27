import { OnInit } from '@angular/core';

export interface ActiveModalParams {
    icon: string;
    title: string;
}

// All data that needs change detection will need to be an observable for this to work due to it being a dynamically generated component.
// Only async pipe and subscription will run change detection
export interface ModalComponent {
    [key: string]: any;
    title?: string;
    ngOnInit?: () => void;
}