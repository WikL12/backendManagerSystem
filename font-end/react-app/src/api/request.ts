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
        headers: headers || {
            'Content-Type': 'application/json'
        },
        body: method === 'GET' ? null : JSON.stringify(params)
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
        return Promise.reject(err)
    })
}