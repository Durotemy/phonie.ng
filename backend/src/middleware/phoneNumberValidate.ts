import { Request, Response, NextFunction } from "express";
import Joi, { string } from "joi";

export function validRequest(req: Request, res: Response, next: NextFunction) {
  const schema: any = Joi.object({
    phoneNumber: Joi.string().min(11).max(14).required().messages({
      "string.empty": "phoneNumber cannot be empty",
      "string.min": "Minimum of 11 character is expected",
      "string.max": "Maximum of 14 character is expected",
    }),
  });
  return schema
    .validateAsync(req.body)
    .then(() => {
      next();
    })
    .catch((err: any) => {
      res.send(err.details[0].message);
    });
}

export const validateTelcoNumbers = ()=>{
  
}
