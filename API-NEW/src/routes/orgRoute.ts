import { getAllOrganization, saveOrganization } from '@/controllers/OrganizationController/organization.js';
import { authenticate } from '@/middlewares/authenticate.js';
import express from 'express';

const router = express.Router();
const path = '/organization';

router.get(`${path}/getorg`, getAllOrganization);
router.post(`${path}/saveorg`, saveOrganization);

export const orgRouter = router;