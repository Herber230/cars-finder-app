import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { CarService } from '../services/car.service';
import { SharedDataService } from '../services/shared-data.service';


@Component({
    selector: 'console-control',
    templateUrl: './console-control.component.html',
    styleUrls: ['./console-control.component.css']
})
class ConsoleControl implements OnInit 
{
    //#region Properties

    @ViewChild('inputSearchText') inputSearchText : ElementRef;

    private _consoleMode = ConsoleMode.SEARCH;
    private _searchType : SearchType;
    
    //#endregion

    //#region Methods

    constructor(public bsModalRef: BsModalRef, private carService : CarService, private sharedDataService : SharedDataService) 
    {

    }

    ngOnInit(): void {

        setTimeout( () => this.inputSearchText.nativeElement.focus(), 0);
    }

    keypress(event) : void 
    {
        // if (event instanceof KeyboardEvent) {
        //     if (event.code == 'Enter' && this._consoleMode == ConsoleMode.SEARCH && this.consoleInputValue)
        //         this.performSearch();
        //     if (event.code == 'Enter' && this._consoleMode == ConsoleMode.COMMAND && this.consoleInputValue)
        //         this.performCommand();
        // }

        if (event instanceof KeyboardEvent) {
            if (event.code == 'Enter')
                this.searchCars();
        }
    }

    keyup(event) : void
    {
        // this.evaluateContent();
    }

    private searchCars() : void
    {
        let queryFilter : any;
        if (this.consoleInputValue)
            queryFilter = { 
                lineName: this.consoleInputValue,
                color: this.consoleInputValue, 
                'brand.name': this.consoleInputValue
            };

        if (!isNaN(this.consoleInputValue as any))
            queryFilter.year = parseInt(this.consoleInputValue);

        this.carService
            .search(queryFilter)
            .subscribe({
                next: results => {
                    this.sharedDataService.searchCarResult = results;
                    this.bsModalRef.hide();
                }   
            });
    }

    private loadData() : void
    {

    }

    //#endregion 


    //#region Accessors


    get iconClass()
    {
        switch(this._consoleMode) {
            case ConsoleMode.SEARCH:
                return 'fa fa-search console-icon';
            
            case ConsoleMode.COMMAND:
                return 'fa fa-terminal console-icon';
        }
    }

    get placeholder()
    {
        switch(this._consoleMode) {
            case ConsoleMode.SEARCH:
                return 'BUSCAR';
            
            case ConsoleMode.COMMAND:
                return 'COMANDO';
        }
    }

    get consoleInfoMessage()
    {
        if (this._consoleMode == ConsoleMode.SEARCH) 
            switch(this._searchType) {
                case SearchType.IMSI:
                    return 'IMSI';
                case SearchType.VALUE:
                    return 'MSISDN';
                case SearchType.SERIAL_NUMBER:
                    return 'ICC';
                case SearchType.PARTIAL:
                    return 'partial text';     
                default:
                    return null;               
            }
        // else if (this._consoleMode == ConsoleMode.COMMAND) 
        //     switch(this._commandType) {

        //     }
    }


    get searchType()
    {
        return this._searchType;
    }

    get consoleInputValue() : string 
    {
        if (this.inputSearchText && this.inputSearchText.nativeElement)
            return this.inputSearchText.nativeElement.value;
    }

    //#endregion
}

enum ConsoleMode 
{
    SEARCH,
    COMMAND
}

enum SearchType
{
    VALUE = 'value',
    SERIAL_NUMBER = "Serial Number",
    PARTIAL = "Partial Text",
    IMSI = "Characteristic - Imsi "
}

export { ConsoleControl }