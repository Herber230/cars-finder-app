import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { SharedDataService } from '../services/shared-data.service';
import { Panel } from 'primeng/panel'
import { HandledException, HandledExceptionType } from '../utils/HandledException';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-search-panel',
    templateUrl: './search-panel.component.html',
    styleUrls: ['./search-panel.component.css']
})
export class SearchPanelComponent implements OnInit 
{
    //#region Properties

    state : SearchPanelState;

    //#endregion
    

    //#region Methods

    constructor(private carsService : CarService, private sharedDataService : SharedDataService) { }

    ngOnInit(): void 
    {
        this.checkInitialState();    
    }

    private checkInitialState() : void
    {
        this.carsService
            .verifyBackend()
            .subscribe({ 
                next: () => this.state = SearchPanelState.SEARCH_HELPER,
                error: e => {
                    if (e instanceof HandledException) {
                        if (e.type == HandledExceptionType.EMPTY_BACKEND)
                            this.state = SearchPanelState.FILL_DATA_HELPER;
                        if (e.type == HandledExceptionType.NO_AVAILABLE_BACKEND)
                            this.state = SearchPanelState.RUN_BACKEND_HELPER;
                    }
                }
            });
    }

    createExampleRecords() : void
    {
        this.carsService.createExampleRecords().subscribe({
            next:  createdRecord => { 
                console.log('[>] Created record: ' + JSON.stringify(createdRecord)); 
                this.state = SearchPanelState.SEARCH_HELPER
            }        
        });
    }

    //#endregion


    //#region Accessors

    get searchCarsResult()
    {
        return this.sharedDataService && this.sharedDataService.searchCarResult ? this.sharedDataService.searchCarResult : [];
    }

    get existResults() : boolean
    {
        return this.sharedDataService && this.sharedDataService.searchCarResult && this.sharedDataService.searchCarResult.length > 0;
    }    
    
    //#endregion
}

enum SearchPanelState {
    RUN_BACKEND_HELPER = 'RUN_BACKEND_HELPER',
    FILL_DATA_HELPER = 'FILL_DATA_HELPER',
    SEARCH_HELPER = 'SEARCH_HELPER'
}

