import { BASE_URL } from "../parameters/constants";
import { makeHeaders } from "./common";
import { Box__c, Box_Stats } from "./structure";

export const apiGetBox = async (): Promise<Array<Box__c>> => {

    const headers = makeHeaders(
        {
            'Accept': 'application/json',
        }
    );
    
    const res = await fetch(`${BASE_URL}/box`, { method: "GET", headers: headers })
    if (res.status !== 200) throw { success: false, reason: 'GET /box failed' };
    const data = await res.json();
    return data;
}

export const apiPatchBox = async (id:number, box:Box__c): Promise<null> => {

    const headers = makeHeaders(
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    );
    
    const data = JSON.stringify(box);

    const res = await fetch(`${BASE_URL}/box/${id}`, { method: "PATCH", headers: headers, body: data })
    if (res.status !== 200) throw { success: false, reason: 'PATCH /box failed' };
    return null;
}

export const apiGetStats = async (): Promise<Array<Box_Stats>> => {

    const headers = makeHeaders(
        {
            'Accept': 'application/json',
        }       
    );

    const res = await fetch(`${BASE_URL}/stats`, { method: "GET", headers: headers});
    if (res.status !== 200) throw { success: false, reason: 'GET /stats failed'};
    const data = await res.json();
    return data;
}