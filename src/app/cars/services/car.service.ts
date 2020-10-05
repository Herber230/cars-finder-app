import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarConfigService } from './car-config.service';
import { HandledException, HandledExceptionType } from '../utils/HandledException';
import { Car } from '../model/inderface-models';

@Injectable({
    providedIn: 'root'
})
export class CarService 
{
    //#region Properties

    //#endregion


    //#region Methods

    constructor(private httpService : HttpClient, private configService : CarConfigService) { }
    
    verifyBackend() 
    {
        return new Observable<void>( observer => 
            this.httpService
                .get<any>(this.carsUri)
                .subscribe({
                        next: n => {
                            if (n && n.data && n.data.length > 0)
                                observer.next();
                            else
                                observer.error(new HandledException(HandledExceptionType.EMPTY_BACKEND));
                        },
                        error: error => {
                            if (error instanceof HttpErrorResponse) 
                                switch(error.status) {
                                    case 0:
                                        observer.error(new HandledException(HandledExceptionType.NO_AVAILABLE_BACKEND))
                                        break;
                                        
                                    default:
                                        observer.error(error);
                                }
                            else
                                observer.error(error);
                        },
                        complete: () => observer.complete()
                    })
        )
    }


    search()
    {
        let completeUri = this.carsUri;

        return this.httpService
                    .get<any>(completeUri)
                    .pipe(map( response => response && response.data && response.data.length > 0 ? response.data as Array<Car> : null ));
    }

    //#endregion


    //#region Accessors

    get carsUri()
    {   
        let backendBaseUri = this.configService.getConfiguration<String>('backendBaseUri');
        return backendBaseUri + '/car';
    }
    
    //#endregion

}
