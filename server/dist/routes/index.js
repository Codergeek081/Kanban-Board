import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';
const router = Router();
router.use('/auth', authRoutes);
// TODO: Add authentication to the API routes
// router.use('/api', authenticateToken, apiRoutes);
// For now, we will not use authentication for the API routes
// This is for testing purposes only
router.use('/api', authenticateToken, apiRoutes);
export default router;
