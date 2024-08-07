import { EventEmitter, } from '@angular/core';


export interface ICustomModal {
    close: EventEmitter<any>;
    handleEscapeKey(event: KeyboardEvent): void;
    closeUpdateModal(): void;
}