import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Joi from '@hapi/joi';

interface IPayload {
  _id: string;
  iat: number;
  exp: number;
}

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userToken = req.header('Bearer');

  if (!userToken) return res.status(401).json('Access denied');

  const payload = jwt.verify(
    userToken,
    process.env.SECRET_KEY || 'tokentest'
  ) as IPayload;
  console.log(payload);
  // userId doesnt exist on Request interface hence I need to extend it trough "declaration mergin"
  req.userId = payload._id;

  next();
};

export const validateLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
  });
  try {
    await schema.validateAsync(req.body);
  } catch (e) {
    res.status(400);
    next(e);
  }
  next();
};

export const validateSingUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    username: Joi.string()
      .min(4)
      .required(),
    email: Joi.string().required(),
    password: Joi.string().required()
  });
  try {
    await schema.validateAsync(req.body);
  } catch (e) {
    res.status(400);
    next(e);
  }
  next();
};
