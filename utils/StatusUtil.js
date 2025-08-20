import { HttpStatusCode } from "axios";

//used to handle the status of the response
export const status={
    ok:HttpStatusCode.Ok,
    created:HttpStatusCode.Created,
    nocontent:HttpStatusCode.NoContent,
    badrequest:HttpStatusCode.BadRequest,
    unauthorized:HttpStatusCode.Unauthorized,
    conflict:HttpStatusCode.Conflict,
}