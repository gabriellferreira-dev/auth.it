import { Router } from 'express';

import * as UserController from './controllers/User';
import AuthController from './controllers/Auth';
import auth from './middlewares/auth';

const router = Router();

router.post('/user', UserController.create);
router.get('/user/:id', UserController.findOne);
router.put('/user/:id', auth, UserController.update);
router.delete('/user/:id', auth, UserController.deleteOne);

router.post('/auth', AuthController.authenticate);

export default router;
