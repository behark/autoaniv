import express from 'express';

const router = express.Router();

// File upload routes
router.post('/', async (req: any, res: any) => {
  res.json({ success: true, message: 'Upload endpoint' });
});

export default router;
