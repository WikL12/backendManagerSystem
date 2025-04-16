export interface requestType {
    (url: string,
        method: string,
        headers?: any,
        params?: any,): Promise<any>
}
export const requestFun: requestType = (url, method, headers, params) => {
    console.log('url', params)
    const requestUrl = method === 'GET' && params ?
        `${url}?${new URLSearchParams(params).toString()}` :
        url;

    return fetch(requestUrl, {
        method: method || 'POST',
        headers: headers || {
            'Content-Type': 'application/json'
        },
        body: method === 'GET' ? null : JSON.stringify(params)
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
    }
    ).catch(err => {
        // handle error
        console.log(err)
        return Promise.reject(err)
    })
}