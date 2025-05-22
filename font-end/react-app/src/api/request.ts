 import {  notification } from 'antd';
// 请求全局错误提示
 type NotificationType = 'success' | 'info' | 'warning' | 'error';
//  const [api, contextHolder] = notification.useNotification();
//  const openNotificationWithIcon = (type: NotificationType,description:string) => {
//     api[type]({
//       message: 'Notification Title',
//       description:
//         description,
//     });
//   };

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
        headers: headers['Content-Type'] ? headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: method === 'GET' ? null : JSON.stringify(params),
        credentials: 'include'
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
        // handle error
        // openNotificationWithIcon('error','服务端错误，请求解析失败')
    }
    ).catch(err => {
        // handle error
        // openNotificationWithIcon('error',err.message)
        console.log(err)
        return Promise.reject(err)
    })
}

export const requestFile:requestType = (url, method, headers, params) => {
    console.log('url', params)
    const requestUrl = method === 'GET' && params ?
        `${url}?${new URLSearchParams(params).toString()}` :
        url;

    return fetch(requestUrl, {
        method: method || 'POST',
        headers: {
        },
        body: method === 'GET' ? null : params,
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
        // handle error
        // openNotificationWithIcon('error','服务端错误，请求解析失败')
    }
    ).catch(err => {
        // handle error
        // openNotificationWithIcon('error',err.message)
        console.log(err)
        return Promise.reject(err)
    })
}

export const downLoadFn:requestType = (url, method, headers, params) => {
    console.log('url', params)
    const requestUrl = method === 'GET' && params ?
        `${url}?${new URLSearchParams(params).toString()}` :
        url;

    return fetch(requestUrl, {
        method: method || 'POST',
        headers: headers['Content-Type'] ? headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: method === 'GET' ? null : JSON.stringify(params),
    }).then(res => {
        if (res.ok) {
            return res.arrayBuffer()
        }
        // handle error
        // openNotificationWithIcon('error','服务端错误，请求解析失败')
    }
    ).then(res=>{
        const blob = new Blob([res]);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = params.fileName;
        a.click();
    }).catch(err => {
        // handle error
        // openNotificationWithIcon('error',err.message)
        console.log(err)
        return Promise.reject(err)
    })
}