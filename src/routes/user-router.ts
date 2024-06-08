import { Router } from 'express';
import { loginUser, newUser } from '../controllers/user-controller';

const router = Router();

// Gets

// Post
router.post('/', newUser);
router.post('/login', loginUser);

export default router;
