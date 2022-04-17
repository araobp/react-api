import { BASE_URL } from "../parameters/constants";
import { makeHeaders } from "./common";
import { Box } from "./structure";

export const apiGetBox = async (): Promise<Array<Box>> => {

    const headers = makeHeaders(
        {
            'Accept': 'application/json',
        }
    );
    
    const res = await fetch(`${BASE_URL}/box`, { method: "GET", headers: headers })
    if (res.status != 200) throw { success: false, reason: 'GET /box failed' };
    const data = await res.json();
    return data;
}
