import {API_KEY} from "./Key";

export interface ICurrency {
    currencyName: string,
    currencySymbol?: string,
    id: string
}

export async function getCurrencies(): Promise<ICurrency[]> {
    let response: Response = await fetch("https://free.currconv.com/api/v7/currencies?apiKey=" + API_KEY);
    let responseData = (await response.json()).results;
    let dataArray: ICurrency[] = [];
    
    // Transfer the data into a proper array so we can iterate through it easier
    for (let key in responseData) {
        if (!responseData.hasOwnProperty(key)) continue;
        dataArray.push(responseData[key]);
    }
    
    return dataArray;
}