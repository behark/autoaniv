import express from 'express';

const router = express.Router();

// SEO metadata routes
router.get('/:page', async (req: any, res: any) => {
  const { page } = req.params;
  
  const seoData = {
    home: {
      title: 'AutoAni - Premium Automotive Dealership',
      description: 'Discover luxury vehicles at AutoAni. Premium cars from top brands with exceptional service.',
      keywords: ['AutoAni', 'cars', 'luxury', 'automotive', 'Kosovo']
    },
    vehicles: {
      title: 'Vehicles - AutoAni',
      description: 'Browse our extensive collection of premium vehicles.',
      keywords: ['vehicles', 'cars', 'luxury cars', 'AutoAni']
    }
  };
  
  res.json({
    success: true,
    data: seoData[page as keyof typeof seoData] || seoData.home
  });
});

export default router;
