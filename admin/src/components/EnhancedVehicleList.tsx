import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  IconButton,
  Menu,
  MenuItem as MenuItemAction,
  ListItemIcon,
  ListItemText,
  Stack
} from '@mui/material';
import {
  Search,
  MoreHorizontal,
  Edit,
  Delete,
  Star,
  Eye,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Vehicle {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  mileage: number;
  fuelType: string;
  transmission: string;
  condition: string;
  location: string;
  images: string[];
  thumbnail: string;
  description: string;
  features: string[];
  isFeatured: boolean;
  isActive: boolean;
  views: number;
  favorites: number;
  createdAt: string;
  updatedAt: string;
}

interface EnhancedVehicleListProps {
  vehicles: Vehicle[];
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (id: string) => void;
  onToggleFeatured: (id: string) => void;
  onToggleActive: (id: string) => void;
}

const EnhancedVehicleList: React.FC<EnhancedVehicleListProps> = ({
  vehicles,
  onEdit,
  onDelete,
  onToggleFeatured,
  onToggleActive
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('updatedAt');
  const [filterBrand, setFilterBrand] = useState('all');
  const [filterCondition, setFilterCondition] = useState('all');
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const itemsPerPage = 12;

  // Filter and sort vehicles
  const filteredVehicles = useMemo(() => {
    let filtered = vehicles.filter(vehicle => {
      const matchesSearch = vehicle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = filterBrand === 'all' || vehicle.brand === filterBrand;
      const matchesCondition = filterCondition === 'all' || vehicle.condition === filterCondition;
      
      return matchesSearch && matchesBrand && matchesCondition;
    });

    // Sort vehicles
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'year-desc':
          return b.year - a.year;
        case 'year-asc':
          return a.year - b.year;
        case 'views':
          return b.views - a.views;
        case 'favorites':
          return b.favorites - a.favorites;
        default:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });

    return filtered;
  }, [vehicles, searchTerm, sortBy, filterBrand, filterCondition]);

  // Get unique brands for filter
  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(vehicles.map(v => v.brand))];
    return uniqueBrands.sort();
  }, [vehicles]);

  // Paginate results
  const paginatedVehicles = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return filteredVehicles.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredVehicles, page]);

  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, vehicle: Vehicle) => {
    setAnchorEl(event.currentTarget);
    setSelectedVehicle(vehicle);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedVehicle(null);
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('en-US').format(mileage);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Vehicle Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your vehicle inventory with advanced filtering and sorting
        </Typography>
      </Box>

      {/* Filters and Search */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: <Search size={20} style={{ marginRight: 8, color: '#666' }} />
                }}
              />
            </Grid>
            
            <Grid item xs={6} sm={3} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Brand</InputLabel>
                <Select
                  value={filterBrand}
                  onChange={(e) => setFilterBrand(e.target.value)}
                  label="Brand"
                >
                  <MenuItem value="all">All Brands</MenuItem>
                  {brands.map(brand => (
                    <MenuItem key={brand} value={brand}>{brand}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} sm={3} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Condition</InputLabel>
                <Select
                  value={filterCondition}
                  onChange={(e) => setFilterCondition(e.target.value)}
                  label="Condition"
                >
                  <MenuItem value="all">All Conditions</MenuItem>
                  <MenuItem value="new">New</MenuItem>
                  <MenuItem value="used">Used</MenuItem>
                  <MenuItem value="certified">Certified</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  label="Sort By"
                >
                  <MenuItem value="updatedAt">Recently Updated</MenuItem>
                  <MenuItem value="price-asc">Price: Low to High</MenuItem>
                  <MenuItem value="price-desc">Price: High to Low</MenuItem>
                  <MenuItem value="year-desc">Year: Newest First</MenuItem>
                  <MenuItem value="year-asc">Year: Oldest First</MenuItem>
                  <MenuItem value="views">Most Viewed</MenuItem>
                  <MenuItem value="favorites">Most Favorited</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Stats */}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Showing {paginatedVehicles.length} of {filteredVehicles.length} vehicles
            </Typography>
            <Button variant="contained" size="small">
              Add New Vehicle
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Vehicle Grid */}
      <Grid container spacing={3}>
        <AnimatePresence>
          {paginatedVehicles.map((vehicle) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={vehicle.id}>
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'translateY(-2px)',
                      transition: 'all 0.2s ease-in-out'
                    }
                  }}
                >
                  {/* Status Badges */}
                  <Box sx={{ 
                    position: 'absolute', 
                    top: 8, 
                    left: 8, 
                    right: 8,
                    display: 'flex',
                    justifyContent: 'space-between',
                    zIndex: 1
                  }}>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      {vehicle.isFeatured && (
                        <Chip 
                          label="Featured" 
                          size="small" 
                          color="warning"
                          sx={{ fontWeight: 600 }}
                        />
                      )}
                      {!vehicle.isActive && (
                        <Chip 
                          label="Inactive" 
                          size="small" 
                          color="error"
                          variant="outlined"
                        />
                      )}
                    </Box>
                    
                    <IconButton
                      size="small"
                      onClick={(e: React.MouseEvent<HTMLElement>) => handleMenuClick(e, vehicle)}
                      sx={{ 
                        bgcolor: 'rgba(255,255,255,0.9)',
                        '&:hover': { bgcolor: 'rgba(255,255,255,1)' }
                      }}
                    >
                      <MoreHorizontal size={16} />
                    </IconButton>
                  </Box>

                  {/* Image */}
                  <CardMedia
                    component="img"
                    height="200"
                    image={vehicle.thumbnail || vehicle.images[0] || '/api/placeholder/300/200'}
                    alt={vehicle.title}
                    sx={{ objectFit: 'cover' }}
                  />

                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    {/* Title */}
                    <Typography variant="h6" component="h3" gutterBottom noWrap>
                      {vehicle.title}
                    </Typography>

                    {/* Brand and Model */}
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {vehicle.year} {vehicle.brand} {vehicle.model}
                    </Typography>

                    {/* Price */}
                    <Typography variant="h5" color="primary" gutterBottom>
                      {formatPrice(vehicle.price, vehicle.currency)}
                    </Typography>

                    {/* Details */}
                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                      <Chip 
                        label={`${formatMileage(vehicle.mileage)} km`} 
                        size="small" 
                        variant="outlined"
                      />
                      <Chip 
                        label={vehicle.fuelType} 
                        size="small" 
                        variant="outlined"
                      />
                    </Stack>

                    {/* Stats */}
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mt: 'auto'
                    }}>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Eye size={14} />
                          <Typography variant="caption">{vehicle.views}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Heart size={14} />
                          <Typography variant="caption">{vehicle.favorites}</Typography>
                        </Box>
                      </Box>
                      
                      <Chip 
                        label={vehicle.condition}
                        size="small"
                        color={vehicle.condition === 'new' ? 'success' : 'default'}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, newPage) => setPage(newPage)}
            color="primary"
            size="large"
          />
        </Box>
      )}

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItemAction onClick={() => { 
          if (selectedVehicle) onEdit(selectedVehicle);
          handleMenuClose();
        }}>
          <ListItemIcon>
            <Edit size={16} />
          </ListItemIcon>
          <ListItemText>Edit Vehicle</ListItemText>
        </MenuItemAction>
        
        <MenuItemAction onClick={() => {
          if (selectedVehicle) onToggleFeatured(selectedVehicle.id);
          handleMenuClose();
        }}>
          <ListItemIcon>
            {selectedVehicle?.isFeatured ? <Star size={16} /> : <Star size={16} />}
          </ListItemIcon>
          <ListItemText>
            {selectedVehicle?.isFeatured ? 'Remove Featured' : 'Mark Featured'}
          </ListItemText>
        </MenuItemAction>
        
        <MenuItemAction onClick={() => {
          if (selectedVehicle) onToggleActive(selectedVehicle.id);
          handleMenuClose();
        }}>
          <ListItemIcon>
            <Eye size={16} />
          </ListItemIcon>
          <ListItemText>
            {selectedVehicle?.isActive ? 'Mark Inactive' : 'Mark Active'}
          </ListItemText>
        </MenuItemAction>
        
        <MenuItemAction 
          onClick={() => {
            if (selectedVehicle) onDelete(selectedVehicle.id);
            handleMenuClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <ListItemIcon>
            <Delete size={16} color="currentColor" />
          </ListItemIcon>
          <ListItemText>Delete Vehicle</ListItemText>
        </MenuItemAction>
      </Menu>
    </Box>
  );
};

export default EnhancedVehicleList;
