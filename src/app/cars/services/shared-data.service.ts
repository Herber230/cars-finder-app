import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarConfigService } from './car-config.service';
import { HandledException, HandledExceptionType } from '../utils/HandledException';
import { Car } from '../model/inderface-models';

@Injectable()
export class SharedDataService 
{
    //#region Properties

    private _searchCarsResult : Array<Car>;

    //#endregion


    //#region Methods

    //#endregion


    //#region Accessors

    get searchCarResult()
    { return this._searchCarsResult; }
    set searchCarResult(value)
    { this._searchCarsResult = value; }

    //#endregion

}
