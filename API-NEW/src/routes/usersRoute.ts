import { getAllUsersForOrgId } from '@/controllers/index.js';
import { saveUser } from '@/controllers/index.js';
import { authenticate } from '@/middlewares/authenticate.js';
import { loginUser } from '@/controllers/index.js';
import express from 'express';

const router = express.Router();
const path = '/users';

router.get(`${path}/allusers/:org_id`, getAllUsersForOrgId);
router.post(`${path}/saveuser`,saveUser)
router.post(`${path}/login`, loginUser); 



export const usersRouter = router;