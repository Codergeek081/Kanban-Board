import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, } from '../../controllers/user-controller.js';
import { authenticateToken } from '../../middleware/auth.js'; // ✅ Import it
const router = express.Router();
// ✅ PROTECT USER ROUTES THAT REQUIRE AUTHENTICATION
router.get('/', authenticateToken, getAllUsers);
router.get('/:id', authenticateToken, getUserById);
router.post('/', createUser); // ❌ usually kept public (register route)
router.put('/:id', authenticateToken, updateUser);
router.delete('/:id', authenticateToken, deleteUser);
export { router as userRouter };
