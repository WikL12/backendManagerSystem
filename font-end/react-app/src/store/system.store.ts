import {create} from 'zustand';

interface SystemStoreType {
    token: string;
    setToken:(token:string)=>void;
    removeToken:()=>void;
}
const useSystemStore = create<SystemStoreType>((set, get) => ({
    token:'',
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
    }
}))

export default useSystemStore