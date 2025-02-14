import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import Authentication from "../model/Authentication";

dotenv.config();

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (!token) {
        res.status(403).json({error: 'A token is required for authentication'});
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded: any) => {
        if (err) {
            res.status(401).json({error: 'Invalid Token'});
            return;
        }

        req.body.verify = new Authentication(decoded.id, undefined);
        next();
    });
}

export default verifyToken;