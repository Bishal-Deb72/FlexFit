import jwt from "jsonwebtoken"
import AppError from "../utils/error.utils.js";

const isLoggedIn = async (req,res,next) => {
    const {token} = req.cookies;
    if(!token){
        return next(new AppError('Unauthonticated, please try again',401))
    }

    const userDetails = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = userDetails
    next();
}

const authorizedRoles = (...roles) =>  async (req,res,next) => {

    const currentUserRole = req.user.role;
    if(!roles.includes(currentUserRole)){
        return next(new AppError('You do not have permission to perform this action',403))
    }
    next();

}

export {
    isLoggedIn,
    authorizedRoles
}