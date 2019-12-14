import { Router, Request, Response } from 'express';
import { signUp, signIn, profile } from '../controllers/auth.controller';
import {
  validateToken,
  validateLogin,
  validateSingUp
} from '../middlewares/validations';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

router.post('/signup', validateSingUp, signUp);
router.post('/signin', validateLogin, signIn);
router.get('/profile', validateToken, profile);

export default router;
