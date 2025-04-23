import express from 'express';
import { getAllTickets, getTicketById, createTicket, updateTicket, deleteTicket, } from '../../controllers/ticket-controller.js';
import { authenticateToken } from '../../middleware/auth.js'; // ✅ Import it
const router = express.Router();
// ✅ PROTECT ALL ROUTES WITH JWT AUTH
router.get('/', authenticateToken, getAllTickets);
router.get('/:id', authenticateToken, getTicketById);
router.post('/', authenticateToken, createTicket);
router.put('/:id', authenticateToken, updateTicket);
router.delete('/:id', authenticateToken, deleteTicket);
export { router as ticketRouter };
