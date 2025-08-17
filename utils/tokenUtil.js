import jwt from "jsonwebtoken";

export async function createAccessToken(user) {
    return jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
}

export async function createRefreshToken(user) {
    return jwt.sign({id:user._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:"7d"});
}

export async function verifyAccessToken(token) {
    const isVerified=await jwt.verify(token,process.env.JWT_SECRET);
    if(isVerified){
        const decoded=jwt.decode(token);
        return decoded;
    }
    else{
        return 400;
    }
}