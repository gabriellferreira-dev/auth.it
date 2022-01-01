import { Router } from 'express';

import * as UserController from './controllers/User';

const router = Router();

router.post('/user', UserController.create);

export default router;
