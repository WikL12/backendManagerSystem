import {requestFun,requestType} from './request';
export interface loginType{
    username:string,
    password:string|number,
}
export const login = ({username, password}:loginType):Promise<requestType> => {
    return requestFun('http://localhost:3000/system/login','POST',{}, {username, password})
}