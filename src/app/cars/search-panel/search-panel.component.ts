import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { SharedDataService } from '../services/shared-data.service';
import { HandledException, HandledExceptionType } from '../utils/HandledException';

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

    //#endregion


    //#region Accessors

    get searchCarsResult()
    {
        return this.sharedDataService && this.sharedDataService.searchCarResult ? this.sharedDataService.searchCarResult : [];
    }
    
    
    //#endregion
}

enum SearchPanelState {
    RUN_BACKEND_HELPER = 'RUN_BACKEND_HELPER',
    FILL_DATA_HELPER = 'FILL_DATA_HELPER',
    SEARCH_HELPER = 'SEARCH_HELPER'
}

