import jwt from "jsonwebtoken";

export async function createAccessToken(user) {
    return jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
}

export async function createRefreshToken(user) {
    return jwt.sign({id:user._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:"7d"});
}
