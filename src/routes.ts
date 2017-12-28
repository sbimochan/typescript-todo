import { Router } from 'express';

import * as homeController from './controllers/homeController';
import * as userController from './controllers/userController';

const router = Router();
router.get('/', homeController.index);

router.get('/users', userController.index);

export default router;
