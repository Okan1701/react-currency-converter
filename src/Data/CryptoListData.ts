const API_URL = "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD";

export interface ICryptoCurrency {
    imageUrl: string,
    name: string,
    fullName: string,
    value: string,
    proofType: string
}

export enum CryptoListSortMode {
    DailyVolume,
    MarketCap
}

export async function getCryptoList(sort: CryptoListSortMode ): Promise<ICryptoCurrency[]> {
    let url;
    // Get the correct URL. Each sorting mode has its own endpoint
    switch (sort) {
        case CryptoListSortMode.DailyVolume:
            url = "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD";
            break;
        case CryptoListSortMode.MarketCap:
            url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
            break;
        default:
            throw "No sort mode specified during getCryptoList call!";
    }
    
    // Verify request was successful
    let response: Response = await fetch(url);
    if (!response.ok) {
        throw `Failed to get crypto data! (${response.status})`;
    }
    
    // Read the response data and create a data array that we can return
    let data: ICryptoCurrency[] = [];
    let responseData = await response.json();
    for (let index in responseData.Data) {
        let element = responseData.Data[index];
        data.push({
            imageUrl: element.CoinInfo.ImageUrl,
            name: element.CoinInfo.Name,
            fullName: element.CoinInfo.FullName,
            value: element.RAW.USD.PRICE  + " USD",
            proofType: element.CoinInfo.ProofType
        });
    }
    
    return data;
}

export function getImageUrl(imageUrl: string): string {
    return "https://www.cryptocompare.com" + imageUrl;
}