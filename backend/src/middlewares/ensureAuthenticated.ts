import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;

    if(!authToken) {
        return response.status(401).json({
            message: "Token is missing"
        })
    }

    const [, token] = authToken.split(" ");

    try {
        verify(token,'cb07bfc9-42db-4087-85e8-a6636e39f62d') 
        next();
    } catch (error) {
        return response.status(401).json({
            message: "Token invalid"
        })
    }
}