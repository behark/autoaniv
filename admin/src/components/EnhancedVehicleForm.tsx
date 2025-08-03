import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
    Typography
} from '@mui/material';
import {
    Car,
    ChevronDown,
    DollarSign,
    Eye,
    EyeOff,
    FileText,
    Image as ImageIcon,
    Plus,
    Save,
    Settings,
    Upload,
    X
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface Vehicle {
  id?: string;
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
  exteriorColor: string;
  interiorColor: string;
  bodyType: string;
  engineSize: string;
  doors: number;
  seats: number;
  warranty: string;
  vin: string;
  licensePlate: string;
}

interface EnhancedVehicleFormProps {
  vehicle?: Vehicle;
  onSubmit: (vehicleData: Vehicle) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const defaultVehicle: Vehicle = {
  title: '',
  brand: '',
  model: '',
  year: new Date().getFullYear(),
  price: 0,
  currency: 'USD',
  mileage: 0,
  fuelType: 'gasoline',
  transmission: 'automatic',
  condition: 'used',
  location: '',
  images: [],
  thumbnail: '',
  description: '',
  features: [],
  isFeatured: false,
  isActive: true,
  exteriorColor: '',
  interiorColor: '',
  bodyType: '',
  engineSize: '',
  doors: 4,
  seats: 5,
  warranty: '',
  vin: '',
  licensePlate: ''
};

const EnhancedVehicleForm: React.FC<EnhancedVehicleFormProps> = ({
  vehicle,
  onSubmit,
  onCancel,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<Vehicle>(vehicle || defaultVehicle);
  const [newFeature, setNewFeature] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (vehicle) {
      setFormData(vehicle);
    }
  }, [vehicle]);

  const brands = [
    'Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes-Benz', 'Audi', 
    'Volkswagen', 'Nissan', 'Hyundai', 'Kia', 'Mazda', 'Subaru', 'Lexus',
    'Porsche', 'Ferrari', 'Lamborghini', 'Bentley', 'Rolls-Royce', 'Other'
  ];

  const fuelTypes = ['gasoline', 'diesel', 'hybrid', 'electric', 'plug-in-hybrid', 'other'];
  const transmissions = ['automatic', 'manual', 'cvt', 'dual-clutch'];
  const conditions = ['new', 'used', 'certified', 'damaged'];
  const bodyTypes = ['sedan', 'suv', 'hatchback', 'coupe', 'convertible', 'wagon', 'pickup', 'van', 'other'];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.brand) newErrors.brand = 'Brand is required';
    if (!formData.model.trim()) newErrors.model = 'Model is required';
    if (formData.year < 1900 || formData.year > new Date().getFullYear() + 1) {
      newErrors.year = 'Please enter a valid year';
    }
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (formData.mileage < 0) newErrors.mileage = 'Mileage cannot be negative';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3 
      }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            {vehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {vehicle ? 'Update vehicle information' : 'Add a new vehicle to your inventory'}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            onClick={() => setPreviewMode(!previewMode)}
            startIcon={previewMode ? <EyeOff size={16} /> : <Eye size={16} />}
            variant="outlined"
          >
            {previewMode ? 'Edit Mode' : 'Preview'}
          </Button>
          <Button onClick={onCancel} variant="outlined">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            disabled={isLoading}
            startIcon={<Save size={16} />}
          >
            {isLoading ? 'Saving...' : 'Save Vehicle'}
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} lg={8}>
          {/* Basic Information */}
          <Card sx={{ mb: 3 }}>
            <CardHeader 
              title="Basic Information"
              avatar={<Car size={20} />}
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Vehicle Title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    error={!!errors.title}
                    helperText={errors.title}
                    placeholder="e.g., 2023 Toyota Camry LE"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={!!errors.brand}>
                    <InputLabel>Brand</InputLabel>
                    <Select
                      value={formData.brand}
                      onChange={(e) => handleInputChange('brand', e.target.value)}
                      label="Brand"
                    >
                      {brands.map(brand => (
                        <MenuItem key={brand} value={brand}>{brand}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Model"
                    value={formData.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    error={!!errors.model}
                    helperText={errors.model}
                  />
                </Grid>
                
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label="Year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                    error={!!errors.year}
                    helperText={errors.year}
                  />
                </Grid>
                
                <Grid item xs={6} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel>Condition</InputLabel>
                    <Select
                      value={formData.condition}
                      onChange={(e) => handleInputChange('condition', e.target.value)}
                      label="Condition"
                    >
                      {conditions.map(condition => (
                        <MenuItem key={condition} value={condition}>
                          {condition.charAt(0).toUpperCase() + condition.slice(1)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={6} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel>Body Type</InputLabel>
                    <Select
                      value={formData.bodyType}
                      onChange={(e) => handleInputChange('bodyType', e.target.value)}
                      label="Body Type"
                    >
                      {bodyTypes.map(type => (
                        <MenuItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label="Location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card sx={{ mb: 3 }}>
            <CardHeader 
              title="Pricing & Details"
              avatar={<DollarSign size={20} />}
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={8} sm={9}>
                  <TextField
                    fullWidth
                    label="Price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                    error={!!errors.price}
                    helperText={errors.price}
                  />
                </Grid>
                
                <Grid item xs={4} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel>Currency</InputLabel>
                    <Select
                      value={formData.currency}
                      onChange={(e) => handleInputChange('currency', e.target.value)}
                      label="Currency"
                    >
                      <MenuItem value="USD">USD</MenuItem>
                      <MenuItem value="EUR">EUR</MenuItem>
                      <MenuItem value="GBP">GBP</MenuItem>
                      <MenuItem value="CAD">CAD</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={6} sm={4}>
                  <TextField
                    fullWidth
                    label="Mileage (km)"
                    type="number"
                    value={formData.mileage}
                    onChange={(e) => handleInputChange('mileage', parseInt(e.target.value) || 0)}
                    error={!!errors.mileage}
                    helperText={errors.mileage}
                  />
                </Grid>
                
                <Grid item xs={6} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Fuel Type</InputLabel>
                    <Select
                      value={formData.fuelType}
                      onChange={(e) => handleInputChange('fuelType', e.target.value)}
                      label="Fuel Type"
                    >
                      {fuelTypes.map(fuel => (
                        <MenuItem key={fuel} value={fuel}>
                          {fuel.charAt(0).toUpperCase() + fuel.slice(1).replace('-', ' ')}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Transmission</InputLabel>
                    <Select
                      value={formData.transmission}
                      onChange={(e) => handleInputChange('transmission', e.target.value)}
                      label="Transmission"
                    >
                      {transmissions.map(transmission => (
                        <MenuItem key={transmission} value={transmission}>
                          {transmission.charAt(0).toUpperCase() + transmission.slice(1).replace('-', ' ')}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Advanced Details Accordion */}
          <Accordion sx={{ mb: 3 }}>
            <AccordionSummary expandIcon={<ChevronDown />}>
              <Typography variant="h6">Advanced Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={4}>
                  <TextField
                    fullWidth
                    label="Exterior Color"
                    value={formData.exteriorColor}
                    onChange={(e) => handleInputChange('exteriorColor', e.target.value)}
                  />
                </Grid>
                
                <Grid item xs={6} sm={4}>
                  <TextField
                    fullWidth
                    label="Interior Color"
                    value={formData.interiorColor}
                    onChange={(e) => handleInputChange('interiorColor', e.target.value)}
                  />
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Engine Size"
                    value={formData.engineSize}
                    onChange={(e) => handleInputChange('engineSize', e.target.value)}
                    placeholder="e.g., 2.0L, V6"
                  />
                </Grid>
                
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label="Doors"
                    type="number"
                    value={formData.doors}
                    onChange={(e) => handleInputChange('doors', parseInt(e.target.value) || 4)}
                  />
                </Grid>
                
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label="Seats"
                    type="number"
                    value={formData.seats}
                    onChange={(e) => handleInputChange('seats', parseInt(e.target.value) || 5)}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Warranty"
                    value={formData.warranty}
                    onChange={(e) => handleInputChange('warranty', e.target.value)}
                    placeholder="e.g., 3 years/36,000 miles"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="VIN"
                    value={formData.vin}
                    onChange={(e) => handleInputChange('vin', e.target.value)}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="License Plate"
                    value={formData.licensePlate}
                    onChange={(e) => handleInputChange('licensePlate', e.target.value)}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Description */}
          <Card sx={{ mb: 3 }}>
            <CardHeader 
              title="Description"
              avatar={<FileText size={20} />}
            />
            <CardContent>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Vehicle Description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the vehicle's condition, history, special features, etc."
              />
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader 
              title="Features & Equipment"
              avatar={<Settings size={20} />}
            />
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Add Feature"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                    placeholder="e.g., Bluetooth, Sunroof, Heated Seats"
                  />
                  <Button 
                    onClick={addFeature}
                    variant="contained"
                    startIcon={<Plus size={16} />}
                  >
                    Add
                  </Button>
                </Box>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {formData.features.map((feature) => (
                    <Chip
                      key={feature}
                      label={feature}
                      onDelete={() => removeFeature(feature)}
                      deleteIcon={<X size={14} />}
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} lg={4}>
          {/* Status */}
          <Card sx={{ mb: 3 }}>
            <CardHeader title="Status & Visibility" />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isActive}
                      onChange={(e) => handleInputChange('isActive', e.target.checked)}
                    />
                  }
                  label="Active (Visible to customers)"
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isFeatured}
                      onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                    />
                  }
                  label="Featured (Highlighted listing)"
                />
              </Box>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader 
              title="Images"
              avatar={<ImageIcon size={20} />}
              action={
                <Button size="small" startIcon={<Upload size={16} />}>
                  Upload
                </Button>
              }
            />
            <CardContent>
              <Box sx={{ 
                border: '2px dashed',
                borderColor: 'grey.300',
                borderRadius: 1,
                p: 3,
                textAlign: 'center',
                bgcolor: 'grey.50'
              }}>
                <Upload size={48} style={{ color: '#666', marginBottom: 8 }} />
                <Typography variant="body2" color="text.secondary">
                  Drag and drop images here or click to upload
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Recommended: 1200x800px, max 5MB per image
                </Typography>
              </Box>
              
              {formData.images.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Uploaded Images ({formData.images.length})
                  </Typography>
                  <Grid container spacing={1}>
                    {formData.images.map((image, index) => (
                      <Grid item xs={6} key={index}>
                        <Box sx={{ 
                          position: 'relative',
                          aspectRatio: '4/3',
                          bgcolor: 'grey.100',
                          borderRadius: 1,
                          overflow: 'hidden'
                        }}>
                          <img 
                            src={image} 
                            alt={`Vehicle ${index + 1}`}
                            style={{ 
                              width: '100%', 
                              height: '100%', 
                              objectFit: 'cover' 
                            }}
                          />
                          <IconButton
                            size="small"
                            sx={{ 
                              position: 'absolute',
                              top: 4,
                              right: 4,
                              bgcolor: 'rgba(255,255,255,0.8)'
                            }}
                          >
                            <X size={14} />
                          </IconButton>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EnhancedVehicleForm;
