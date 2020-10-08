import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, pipe, zip, forkJoin } from 'rxjs';
import { filter, map,  } from 'rxjs/operators';
import { CarConfigService } from './car-config.service';
import { HandledException, HandledExceptionType } from '../utils/HandledException';
import { Brand, Car } from '../model/inderface-models';
import { insertData } from 'src/app/data/insert-data';
import { BrandService } from './brand.service';

@Injectable({
    providedIn: 'root'
})
export class CarService 
{
    //#region Properties

    //#endregion


    //#region Methods

    constructor(private httpService : HttpClient, private configService : CarConfigService, private brandService : BrandService) { }
    
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


    search(queryFilters : any)
    {
        let filtersString = this.createFiltersUri(queryFilters);

        let completeUri = this.carsUri;
        if (filtersString)
            completeUri += filtersString;

        return this.httpService
                    .get<any>(completeUri)
                    .pipe(map( response => response && response.data && response.data.length > 0 ? response.data as Array<Car> : null ));
    }

    private createFiltersUri(queryFilters : any) : string
    {
        let filtersString = '?fixed_filter=lineName|lk|'+queryFilters.lineName;

        return filtersString;
    }



    create(car : Car) : Observable<Car>
    {
        return this.httpService
                    .post<any>(this.carsUri, car)
                    .pipe( map( response => {
                            // console.log('[>] CarService create http response');
                            return response && response.data ? response.data : null
                        }));
    }


    createExampleRecords(): Observable<Car | Brand> 
    {
        return new Observable<Car | Brand>(mainObserver => {
            let asyncTasks = new Array<Observable<Car | Brand>>();

            let total = insertData.map( batch => 1 + batch.cars.length ).reduce( (prev, curr) => prev + curr, 0);
            let attachTask = (singleTask : Observable<Car | Brand>) => {
                asyncTasks.push(singleTask);
                if (asyncTasks.length == total)
                    zip(asyncTasks).subscribe({ complete: () => mainObserver.complete() });
            };

            insertData.forEach(batch => {
                let brandCreation = this.brandService.create(batch.brand);
                attachTask(brandCreation);

                brandCreation.subscribe({
                    next: createdBrand => {
                        mainObserver.next(createdBrand);
                        batch.cars.forEach(car => {
                            let carCreation = this.create({ ...car, idBrand: createdBrand.id });
                            attachTask(carCreation);
                            carCreation.subscribe({ next: createdCar => mainObserver.next(createdCar), complete: () => console.log('[>] CarCreation completed') });
                        });
                    },
                    complete: () => console.log('[>] BrandCreation completed')
                });
            });
        });
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
