import { getOrgType, saveOrgType } from '@/controllers/organizationTypeController/organizationType.js';
import { authenticate } from '@/middlewares/authenticate.js';
import express from 'express';

const router = express.Router();
const path = '/orgtype';

router.get(`${path}/getorgtypes`, getOrgType);
router.post(`${path}/saveorgtype`, saveOrgType);

export const orgTypeRouter = router;