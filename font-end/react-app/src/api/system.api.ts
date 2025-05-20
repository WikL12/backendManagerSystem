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
const baseUrl = 'http://localhost:3000/'
export const login = ({username, password}:loginType):Promise<ResultType> => {
    return requestFun(baseUrl+'system/login','POST',{}, {username, password})
}

export const logout = ():Promise<ResultType> => {
    return requestFun(baseUrl+'system/logout','POST',{})
}

export const register = ({username, password}:loginType):Promise<ResultType> => {
    return requestFun(baseUrl+'system/register','POST',{}, {username, password})
}

export const getUserList = ():Promise<ResultType> => {
    return requestFun(baseUrl+'user/userList','POST',{})
}

export const getTodoList = ():Promise<ResultType> => {
    return requestFun(baseUrl+'todo','GET',{})
}

interface addTodoInter{
        title: string,
        content: string,
        completionTime: string,
        creater: string,
        isFinished: Boolean,
}
export const addTodoListApi = (params:addTodoInter):Promise<ResultType> => {
    return requestFun(baseUrl+'todo/addToDo','POST',{},params)
}

interface deleteTodoInter{
    id: string|number
}
export const deleteTodoListApi = (params:deleteTodoInter):Promise<ResultType> => {
    return requestFun(baseUrl+'todo/deleteToDo','POST',{},params)
}


interface editTodoInter{
    id: string|number,
    title: string,
    content: string,
    completionTime: string,
    creater: string,
    isFinished: Boolean,
}

export const editTodoListApi = (params:editTodoInter):Promise<ResultType> => {
    return requestFun(baseUrl+'todo/editToDo','POST',{},params)
}