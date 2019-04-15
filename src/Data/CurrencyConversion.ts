import {API_KEY, API_URL} from "./Key";

export interface IConversionResult {
    source: string,
    originalValue: number,
    target: string,
    calculatedValue: number
}

export async function convertValue(source: string, value: number, target: string): Promise<IConversionResult> {
    const url: string = `${API_URL}/api/v7/convert?q=${source}_${target}&compact=ultra&apiKey=${API_KEY}`;
    let response: Response = await fetch(url);

    if (!response.ok) throw `Server encountered an error! (${response.status})`;
    
    let responseData = await response.json();
    let baseValue: number = responseData[source + "_" + target];
    
    return {
        source: source,
        originalValue: value,
        target: target,
        calculatedValue: value * baseValue
    }
}