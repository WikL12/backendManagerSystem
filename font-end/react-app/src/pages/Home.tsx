import { Link } from "react-router"
export default function Home() {
    return (
    <div className="w-3xl flex justify-center items-center h-screen">
        <span>i am home</span>
        <Link to={"/login"}>
            <button>Login</button>
        </Link>
    </div>
    )
    
}