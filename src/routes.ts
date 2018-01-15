import { Router } from 'express';

import * as pgpService from './services/pgpService';
import { RSA_KEY_SIZE } from './constants/constants';
import * as homeController from './controllers/homeController';
import * as userController from './controllers/userController';
import * as authController from './controllers/authController';
import { uniqueEmail, userExists } from './validators/userValidator';

const router = Router();
router.get('/', homeController.index);

router.post('/register', uniqueEmail, authController.register);

router.get('/users', userController.index);
router.get('/users/:id', userController.show);
router.put('/users/:id', userExists, userController.update);
router.delete('/users/:id', userExists, userController.remove);

router.get('/pgp/generate', (req, res, next) => {
  pgpService
    .generatePGPKeys({
      userIds: [{ name: 'Jon Smith', email: 'jon@example.com' }], // multiple user IDs
      numBits: RSA_KEY_SIZE,
      passphrase: 'secret' // protects the private key
    })
    .then((data: {}) => {
      res.send({ data });
    });
});

export default router;
