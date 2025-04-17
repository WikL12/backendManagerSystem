import { ErrorResponse, useRouteError } from "react-router"
import { Empty } from 'antd';
export default function ErrorPage() {
    const errorMessage = useRouteError() as ErrorResponse & Error;
    console.log(errorMessage);
  return(
    <div className="w-full h-screen flex flex-col justify-center items-center">
        <Empty description={'暂无此页面'}/>
        <div>{errorMessage.data}</div>
    </div>
  )
}