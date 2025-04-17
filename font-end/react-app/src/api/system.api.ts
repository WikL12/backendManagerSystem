import {requestFun,requestType} from './request';
export interface loginType{
    username:string,
    password:string|number,
}
export interface ResultType { 
    message:string,
    code:number,
    data?:any
}
export const login = ({username, password}:loginType):Promise<ResultType> => {
    return requestFun('http://localhost:3000/system/login','POST',{}, {username, password})
}

export const logout = ():Promise<ResultType> => {
    return requestFun('http://localhost:3000/system/logout','POST',{})
}

export const register = ({username, password}:loginType):Promise<ResultType> => {
    return requestFun('http://localhost:3000/system/register','POST',{}, {username, password})
}