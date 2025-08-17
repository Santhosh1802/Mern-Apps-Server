import { verifyAccessToken } from "../utils/tokenUtil.js";
import {status} from "../utils/StatusUtil.js";
export async function authUser(req,res,next) {
    let verify;
    try {
        const authHeader=req.headers['authorization'];
        const accessToken=authHeader.split(' ')[1];
        verify=await verifyAccessToken(accessToken);
        if(verify===400){
            return res.status(status.unauthorized);
        }
        else{
            req.body.user_id=verify.id;
        }
    } catch (error) {
        return res.status(status.unauthorized);
    }
    next();
}