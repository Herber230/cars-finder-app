import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CarConfigService 
{
    //#region Properties

    private defaultConfigs : Map<string, any>;

    //#endregion


    //#region Methods

    constructor() { 
        this.createDefaultConfigs();
    }


    getConfiguration<T>(configName: string) : T
    {
        return this.defaultConfigs.get(configName);
    }


    private createDefaultConfigs() : void
    {
        this.defaultConfigs = new Map();
        this.defaultConfigs.set('backendBaseUri', 'http://localhost:3000/api');
    }

    //#endregion


    //#region Accessors

    //#endregion

}
