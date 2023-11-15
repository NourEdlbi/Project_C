import axios, { AxiosResponse } from 'axios';
import { URLSearchParams } from 'url';
export default class HttpService {
    async get(baseURL: string,
        endpoint?: string,
        params?: { [key: string]: any },
        headers?: { [key: string]: any })
        : Promise<AxiosResponse> {
        const url = endpoint ? baseURL.concat(endpoint) : baseURL;
        const options = { params, headers };
        return axios.get(url, options);
    }
    async post(baseURL: string,
        endpoint?: string,
        body?: any,
        params?: { [key: string]: any },
        headers?: { [key: string]: any },
        asFormEncoded?: boolean)
        : Promise<AxiosResponse> {
        const url = endpoint ? baseURL.concat(endpoint) : baseURL;
        const options = { params, headers };

        if (asFormEncoded && body) {
            const bodyParams = new URLSearchParams();
            for (const b of Object.keys(body)) {
                bodyParams.append(b, body[b]);
            }
            body = bodyParams;
        }
        return axios.post(url, body, options);
    }
    async getMany(baseURL: string,
        endpoint?: string,
        paramMaps?: { [key: string]: any }[],
        headers?: { [key: string]: any })
        : Promise<AxiosResponse[]> {
        const tasks: any[] = [];
        for (const params of paramMaps || []) {
            tasks.push(this.get(baseURL, endpoint, params, headers));
        }

        return axios.all(tasks).then(responses => responses.map(resp => resp.data.data || []));
    }
}
