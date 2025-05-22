import {requestFun,requestType,requestFile,downLoadFn} from './request';
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


// 小型文件上传--直接上传
export const littleFileUpload = (params:any,headers={}):Promise<ResultType> => {
    return requestFile(baseUrl+'system/uploadLittleFile','POST',headers,params)
}

// 切片文件上传
export const chunkFileUpload = (params:any,headers={}):Promise<ResultType> => {
    return requestFile(baseUrl+'system/uploadChunkFile','POST',headers,params)
}
// 切片文件合并
export const chunkFileControl = (params:any):Promise<ResultType> => {
    return requestFun(baseUrl+'system/mergeFile','POST',{},params)
}
// 文件流下载
export const fileDownload = (params:any):Promise<ResultType> => {
    return downLoadFn(baseUrl+'system/downloadFile','POST',{},params)
}
