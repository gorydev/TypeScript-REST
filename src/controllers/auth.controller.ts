import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import jwt from 'jsonwebtoken';

export const signUp = async (req: Request, res: Response) => {
  const user: IUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  try {
    // calls the Model method to encrypt the password and assign it to the user
    user.password = await user.encryptPassword(user.password);
    const newUser = await user.save();
    const token: string = jwt.sign(
      { _id: newUser._id },
      process.env.SECRET_KEY || 'tokentest'
    );

    return res
      .header('Bearer', token)
      .status(201)
      .json(newUser);
  } catch (e) {
    res.json(e);
  }
};
export const signIn = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });
  console.log(req.body);
  if (!user) return res.status(401).json('E-mail is not registered');

  const correctPswd: boolean = await user.validatePassword(req.body.password);
  if (!correctPswd) return res.status(401).json('Incorrect password');

  const token: string = jwt.sign(
    { _id: user._id },
    process.env.SECRET_KEY || 'tokentest',
    {
      expiresIn: 60 * 60 * 24 // 1 day
    }
  );

  return res
    .header('Bearer', token)
    .status(200)
    .json(user);
};
export const profile = async (req: Request, res: Response) => {
  const user = await User.findById(req.userId, { password: 0 });
  if (!user) return res.status(404).json('No user found');

  res.json(user);
};
