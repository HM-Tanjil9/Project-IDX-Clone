import express from 'express';
import { createProjectController, getProjectTree } from '../../controllers/projectsController.js';

const router = express.Router();

router.post('/', createProjectController);
router.get('/:projectId/tree', getProjectTree);

export default router;