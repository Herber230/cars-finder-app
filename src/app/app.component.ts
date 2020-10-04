import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConsoleService } from './cars/console/console.service';
import { Subscription, fromEvent } from 'rxjs';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy 
{
    //#region Properties

    title = 'cars-finder';
    bsModalRef : BsModalRef;
    eventKeySubscription: Subscription;

    //#endregion


    //#region Methods

    constructor(private modalService : BsModalService, private consoleService : ConsoleService)
    {

    }

    ngOnInit() 
    {

        this.eventKeySubscription = fromEvent(document, 'keypress').subscribe( e => {
            
            if (e instanceof KeyboardEvent) {
                if (e.ctrlKey && e.shiftKey && e.code == 'KeyF')
                    this.consoleService.openSearch();
            }
        });
    }

    ngOnDestroy() {
        this.eventKeySubscription.unsubscribe();
    }



    openModal(contentTemplate)
    {
        this.consoleService.openSearch();
    }

    //#endregion

    //#region Accessors
    
    //#endregion

}
