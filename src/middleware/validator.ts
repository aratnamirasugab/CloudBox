import {NextFunction, Request, Response} from "express";
import {plainToInstance} from "class-transformer";
import {validate} from "class-validator";

class Validator {
    static classValidator(type: any) {
        return (req: Request, res: Response, next: NextFunction) => {
            const instance = plainToInstance(type, req.body);
            validate(instance).then((error) => {
                if (error) {
                    throw new Error('Unable to find instance');
                } else {
                    req.body = instance;
                    next();
                }
            })
        }
    }
}

export default Validator;