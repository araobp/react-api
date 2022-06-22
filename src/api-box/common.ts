import { Base64 } from 'js-base64';
import { PASSWORD, USERNAME } from '../parameters/constants';

const authHeaders = {Authorization: `Basic ${Base64.encode(`${USERNAME}:${PASSWORD}`)}`};

export const makeHeaders = (headers: object) => {
    return { ...headers, ...authHeaders };
}

