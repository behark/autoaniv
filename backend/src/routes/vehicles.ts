import express from 'express';
import { body, query, validationResult } from 'express-validator';
import Vehicle from '../models/Vehicle';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Vehicle:
 *       type: object
 *       required:
 *         - title
 *         - brand
 *         - model
 *         - year
 *         - price
 *         - mileage
 *         - transmission
 *         - fuelType
 *         - bodyType
 *         - color
 *         - engineSize
 *         - horsepower
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           description: Vehicle title
 *         brand:
 *           type: string
 *           description: Vehicle brand
 *         model:
 *           type: string
 *           description: Vehicle model
 *         year:
 *           type: number
 *           description: Vehicle year
 *         price:
 *           type: number
 *           description: Vehicle price
 *         currency:
 *           type: string
 *           enum: [EUR, USD]
 *           description: Price currency
 */

/**
 * @swagger
 * /api/vehicles:
 *   get:
 *     summary: Get all vehicles with filtering and pagination
 *     tags: [Vehicles]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 12
 *         description: Number of vehicles per page
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: Filter by brand
 *     responses:
 *       200:
 *         description: List of vehicles
 */
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('brand').optional().isString().trim(),
  query('search').optional().isString().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter: any = {};
    
    if (req.query.brand) {
      filter.brand = new RegExp(req.query.brand as string, 'i');
    }
    
    if (req.query.search) {
      filter.$text = { $search: req.query.search as string };
    }

    if (req.query.yearFrom || req.query.yearTo) {
      filter.year = {};
      if (req.query.yearFrom) filter.year.$gte = parseInt(req.query.yearFrom as string);
      if (req.query.yearTo) filter.year.$lte = parseInt(req.query.yearTo as string);
    }

    if (req.query.priceFrom || req.query.priceTo) {
      filter.price = {};
      if (req.query.priceFrom) filter.price.$gte = parseInt(req.query.priceFrom as string);
      if (req.query.priceTo) filter.price.$lte = parseInt(req.query.priceTo as string);
    }

    const [vehicles, total] = await Promise.all([
      Vehicle.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Vehicle.countDocuments(filter)
    ]);

    res.json({
      success: true,
      data: {
        data: vehicles,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total,
          limit
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

/**
 * @swagger
 * /api/vehicles/featured:
 *   get:
 *     summary: Get featured vehicles
 *     tags: [Vehicles]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 6
 *         description: Number of featured vehicles to return
 *     responses:
 *       200:
 *         description: List of featured vehicles
 */
router.get('/featured', [
  query('limit').optional().isInt({ min: 1, max: 20 })
], async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 6;
    
    const vehicles = await Vehicle.find({ featured: true, status: 'Available' })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    res.json({
      success: true,
      data: vehicles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

/**
 * @swagger
 * /api/vehicles/{id}:
 *   get:
 *     summary: Get vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Vehicle ID
 *     responses:
 *       200:
 *         description: Vehicle details
 *       404:
 *         description: Vehicle not found
 */
router.get('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).lean();
    
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        error: 'Vehicle not found'
      });
    }

    res.json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

/**
 * @swagger
 * /api/vehicles/slug/{slug}:
 *   get:
 *     summary: Get vehicle by slug
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Vehicle slug
 *     responses:
 *       200:
 *         description: Vehicle details
 *       404:
 *         description: Vehicle not found
 */
router.get('/slug/:slug', async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ slug: req.params.slug }).lean();
    
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        error: 'Vehicle not found'
      });
    }

    res.json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

export default router;
