import express from 'express';

const router = express.Router();

// Homepage stats
router.get('/homepage', async (req: any, res: any) => {
  try {
    const stats = {
      totalVehicles: 250,
      featuredVehicles: 12,
      brandsCount: 15,
      happyCustomers: 5000
    };
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

export default router;
