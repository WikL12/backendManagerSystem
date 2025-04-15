import { ErrorResponse, useRouteError } from "react-router"

export default function ErrorPage() {
    const errorMessage = useRouteError() as ErrorResponse & Error;
    console.log(errorMessage);
  return(
    <div>There is no this page!
         <div>{errorMessage.data}</div>
    </div>
   
  )
}