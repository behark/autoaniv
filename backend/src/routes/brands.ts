import express from 'express';
import Brand from '../models/Brand';

const router = express.Router();

// Get all brands
router.get('/', async (req: any, res: any) => {
  try {
    const brands = await Brand.find().sort({ name: 1 }).lean();
    res.json({
      success: true,
      data: brands
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// Get featured brands
router.get('/featured', async (req: any, res: any) => {
  try {
    const brands = await Brand.find({ featured: true }).sort({ name: 1 }).lean();
    res.json({
      success: true,
      data: brands
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

export default router;
