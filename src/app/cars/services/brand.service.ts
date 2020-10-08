import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Brand } from '../model/inderface-models';
import { CarConfigService } from './car-config.service';

@Injectable({
    providedIn: 'root'
})
export class BrandService 
{
    //#region Properties
    
    //#endregion

    //#region Methods
    
    constructor(private httpService : HttpClient, private configService : CarConfigService) 
    { 

    }


    create(brand : Brand) : Observable<Brand>
    {
        return this.httpService
                    .post<any>(this.brandsUri, brand)
                    .pipe( map( response => { 
                            // console.log('[>] BrandService create http response');
                            return response && response.data ? response.data : null; 
                        }));
    }

    //#endregion


    //#region Accessors

    get brandsUri()
    {
        let backendBaseUri = this.configService.getConfiguration<String>('backendBaseUri');
        return backendBaseUri + '/brand';
    }
    
    //#endregion
}
