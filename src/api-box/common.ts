import { Base64 } from 'js-base64';
import { PASSWORD, USERNAME } from '../parameters/constants';

const authHeaders = {Authorization: `Basic ${Base64.encode(`${USERNAME}:${PASSWORD}`)}`};

const INTERNAL_ERROR = 'Internal error';

export const makeHeaders = (headers: object) => {
    return { ...headers, ...authHeaders };
}

const ACCEPT_APPLICATION_JSON = makeHeaders({ 'Accept': 'application/json' });
const ACCEPT_OCTET_STREAM = makeHeaders({ 'Accept': 'application/octet-stream' });

