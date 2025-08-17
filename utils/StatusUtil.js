import { HttpStatusCode } from "axios";

export const status={
    ok:HttpStatusCode.Ok,
    created:HttpStatusCode.Created,
    nocontent:HttpStatusCode.NoContent,
    badrequest:HttpStatusCode.BadRequest,
    unauthorized:HttpStatusCode.Unauthorized,
    conflict:HttpStatusCode.Conflict,
}