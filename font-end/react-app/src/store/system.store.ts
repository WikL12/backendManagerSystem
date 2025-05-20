import {create} from 'zustand';

interface SystemStoreType {
    token: string;
    userName: string;
    setToken:(token:string)=>void;
    removeToken:()=>void;
    setUserNameStore:(userName:string)=>void;
    removeUserNameStore:()=>void;
}
const useSystemStore = create<SystemStoreType>((set, get) => ({
    token:'',
    userName:'',
    setToken:(token)=>{
        localStorage.setItem('token',token)
        set((state)=>({
            token:token
        }))
    },
    removeToken:()=>{
        localStorage.removeItem('token')
        set((state)=>({
           token:''
        }))
    },
    setUserNameStore:(userName)=>{
        set((state)=>({
            userName:userName
        }));
        localStorage.setItem('userName',userName)

    },
    removeUserNameStore:()=>{
        localStorage.removeItem('userName')
        set((state)=>({
            userName:''
        }))
    }
}))

export default useSystemStore