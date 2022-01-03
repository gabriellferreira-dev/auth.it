import { userCreateSchema, userAuthSchema } from './controllers/User/validator';
import { Router } from 'express';

import * as UserController from './controllers/User';
import AuthController from './controllers/Auth';
import auth from './middlewares/auth';
import validateBody from './middlewares/validateBody';

const router = Router();

router.post('/user', validateBody(userCreateSchema), UserController.create);
router.get('/user/:id', UserController.findOne);
router.put('/user/:id', auth, UserController.update);
router.delete('/user/:id', auth, UserController.deleteOne);

router.post('/auth', validateBody(userAuthSchema), AuthController.authenticate);

export default router;
