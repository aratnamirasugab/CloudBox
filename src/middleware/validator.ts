import {NextFunction, Request, Response} from "express";
import {plainToInstance} from "class-transformer";
import {validate} from "class-validator";

class Validator {
    static classValidator(type: any) {
        return (req: Request, res: Response, next: NextFunction) => {
            const instance = plainToInstance(type, req.body);
            validate(instance).then((error) => {
                if (error.length > 0) {
                    console.warn(`Unable to validate instance: ${type} . payload: ${JSON.stringify(req.body)}`);
                    throw new Error();
                } else {
                    req.body = instance;
                    next();
                }
            })
        }
    }
}

export default Validator;