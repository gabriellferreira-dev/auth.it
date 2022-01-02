import { Router } from 'express';

import * as UserController from './controllers/User';
import AuthController from './controllers/Auth';

const router = Router();

router.post('/user', UserController.create);
router.get('/user/:id', UserController.findOne);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.deleteOne);

router.post('/auth', AuthController.authenticate);

export default router;
