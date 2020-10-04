import { Injectable } from '@angular/core';

import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ConsoleControl } from './console-control.component';


@Injectable()
class ConsoleService 
{
    //#region Properties

    private _modalConfig : ModalOptions = {
        backdrop: true,
        ignoreBackdropClick: false,
        animated: true,
        class: 'transparent-modal-content'
    };

    //#endregion


    //#region Methods

    constructor(private modalService : BsModalService) {

    }

    openSearch(): void {        
        this.modalService.show(ConsoleControl, this._modalConfig);
    }

    
    //#endregion

    //#region Accessors

    //#endregion
}

export { ConsoleService }