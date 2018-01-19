import { Router } from 'express';

import * as pgpService from './services/pgpService';
import * as pgpController from './controllers/pgpController';
import * as homeController from './controllers/homeController';
import * as userController from './controllers/userController';
import * as authController from './controllers/authController';
import * as tagsController from './controllers/tagsController';
import * as userService from './services/userService';
import * as todoService from './services/todoService';
import { findUser, userValidator } from './validators/userValidator';
import { findTodo } from './validators/todoValidator';

const router = Router();
router.get('/', homeController.index);

// router.post('/register', uniqueEmail, authController.register);

router.get('/users', userController.index);
router.get('/users/:id', userController.show);
router.post('/users/',userController.createUser);
router.put('/users/:id',findUser,userValidator,userController.changeUser);
router.delete('/users/:id',findUser,userController.removeUser);


/* todo */
router.get('/users/:id/todo', userController.indexTodo);
router.get('/users/:id/todo/:todoId', userService.ensureToken,userController.showTodo);
router.post('/users/:id/todo',userService.ensureToken,userController.createTodo);
router.put('/users/:id/todo/:todoId',findTodo,userController.changeTodo);
router.delete('/users/:id/todo/:todoId',findTodo,userController.removeTodo);

router.post('/login', authController.login);
router.get('/refresh', authController.refreshToken);
router.get('/logout', authController.logout);
router.get('/tags', tagsController.index);
router.get('/tags/:id', tagsController.show);

// router.post('/pgp/generate', pgpController.generate);
// router.post('/pgp/encrypt', pgpController.encrypt);
// router.post('/pgp/decrypt', pgpController.decrypt);
// router.post('/pgp/both', pgpController.both);
export default router;
