import { Request } from "express";
import { verify } from "jsonwebtoken";

const getIdFromTokenJWT = (request : Request) => {
    var authorization = request.headers.authorization.split(' ')[1],decoded;
        decoded = verify(authorization,'cb07bfc9-42db-4087-85e8-a6636e39f62d')
        return decoded.id;
}

export { getIdFromTokenJWT }