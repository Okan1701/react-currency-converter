import {API_KEY, API_URL} from "./Key";

export async function getCurrencyHistoryData(source: string, target: string) {
    const url: string = `${API_URL}/api/v7/convert?q=${source}_${target}&compact=ultra&date=2019-04-04&endDate=2019-04-12&apiKey=${API_KEY}`;
    let response: Response = await fetch(url);
    let responseData = (await response.json())[source+"_"+target];
    let dataArray = [["date", target]];
    for (let key in responseData) {
        if (!responseData.hasOwnProperty(key)) continue;
        dataArray.push([key, responseData[key]]);
    }
    
    return dataArray;
}