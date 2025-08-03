import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    LinearProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
    useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import {
    Activity,
    ArrowDownRight,
    ArrowUpRight,
    Car,
    Edit,
    Eye,
    Heart,
    MoreHorizontal,
    ShoppingBag,
    Star,
    TrendingUp,
    Upload,
    Users
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

interface DashboardData {
  stats: {
    totalVehicles: number;
    activeVehicles: number;
    featuredVehicles: number;
    totalViews: number;
    totalFavorites: number;
    totalBrands: number;
    monthlyGrowth: number;
  };
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
    user: string;
    avatar?: string;
  }>;
  popularVehicles: Array<{
    id: string;
    title: string;
    views: number;
    favorites: number;
    image: string;
    price: number;
  }>;
  chartData: {
    monthly: Array<{ month: string; vehicles: number; views: number; favorites: number }>;
    brandDistribution: Array<{ name: string; value: number; color: string }>;
    conditionStats: Array<{ condition: string; count: number }>;
  };
}

const EnhancedDashboard: React.FC = () => {
  const theme = useTheme();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  // Sample data - replace with actual API calls
  useEffect(() => {
    const sampleData: DashboardData = {
      stats: {
        totalVehicles: 156,
        activeVehicles: 142,
        featuredVehicles: 23,
        totalViews: 12450,
        totalFavorites: 3200,
        totalBrands: 18,
        monthlyGrowth: 12.5
      },
      recentActivity: [
        {
          id: '1',
          type: 'vehicle_added',
          description: 'Added new 2023 Toyota Camry',
          timestamp: '2 minutes ago',
          user: 'John Admin',
          avatar: '/api/placeholder/32/32'
        },
        {
          id: '2',
          type: 'vehicle_updated',
          description: 'Updated BMW X5 pricing',
          timestamp: '15 minutes ago',
          user: 'Sarah Editor',
          avatar: '/api/placeholder/32/32'
        },
        {
          id: '3',
          type: 'media_uploaded',
          description: 'Uploaded 5 new vehicle images',
          timestamp: '1 hour ago',
          user: 'Mike Photo',
          avatar: '/api/placeholder/32/32'
        },
        {
          id: '4',
          type: 'vehicle_featured',
          description: 'Featured Mercedes-Benz C-Class',
          timestamp: '2 hours ago',
          user: 'John Admin',
          avatar: '/api/placeholder/32/32'
        }
      ],
      popularVehicles: [
        {
          id: '1',
          title: '2023 Tesla Model S',
          views: 1250,
          favorites: 89,
          image: '/api/placeholder/80/60',
          price: 89990
        },
        {
          id: '2',
          title: '2022 BMW X5',
          views: 980,
          favorites: 67,
          image: '/api/placeholder/80/60',
          price: 65900
        },
        {
          id: '3',
          title: '2023 Audi Q7',
          views: 876,
          favorites: 54,
          image: '/api/placeholder/80/60',
          price: 59900
        }
      ],
      chartData: {
        monthly: [
          { month: 'Jan', vehicles: 12, views: 2400, favorites: 640 },
          { month: 'Feb', vehicles: 19, views: 3200, favorites: 800 },
          { month: 'Mar', vehicles: 15, views: 2800, favorites: 720 },
          { month: 'Apr', vehicles: 22, views: 4100, favorites: 1100 },
          { month: 'May', vehicles: 18, views: 3600, favorites: 950 },
          { month: 'Jun', vehicles: 25, views: 4800, favorites: 1300 }
        ],
        brandDistribution: [
          { name: 'Toyota', value: 35, color: '#FF6B6B' },
          { name: 'BMW', value: 28, color: '#4ECDC4' },
          { name: 'Mercedes', value: 22, color: '#45B7D1' },
          { name: 'Audi', value: 18, color: '#96CEB4' },
          { name: 'Other', value: 15, color: '#FECA57' }
        ],
        conditionStats: [
          { condition: 'New', count: 45 },
          { condition: 'Used', count: 89 },
          { condition: 'Certified', count: 22 }
        ]
      }
    };

    setTimeout(() => {
      setDashboardData(sampleData);
      setLoading(false);
    }, 1000);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'vehicle_added':
        return <Car size={16} />;
      case 'vehicle_updated':
        return <Edit size={16} />;
      case 'media_uploaded':
        return <Upload size={16} />;
      case 'vehicle_featured':
        return <Star size={16} />;
      default:
        return <Activity size={16} />;
    }
  };

  if (loading || !dashboardData) {
    return (
      <Box sx={{ p: 3 }}>
        <LinearProgress />
        <Typography sx={{ mt: 2 }}>Loading dashboard...</Typography>
      </Box>
    );
  }

  const statCards = [
    {
      title: 'Total Vehicles',
      value: dashboardData.stats.totalVehicles,
      change: '+12.5%',
      positive: true,
      icon: <Car size={24} />,
      color: 'primary'
    },
    {
      title: 'Active Listings',
      value: dashboardData.stats.activeVehicles,
      change: '+8.2%',
      positive: true,
      icon: <Eye size={24} />,
      color: 'success'
    },
    {
      title: 'Total Views',
      value: dashboardData.stats.totalViews.toLocaleString(),
      change: '+15.3%',
      positive: true,
      icon: <TrendingUp size={24} />,
      color: 'info'
    },
    {
      title: 'Favorites',
      value: dashboardData.stats.totalFavorites.toLocaleString(),
      change: '+6.1%',
      positive: true,
      icon: <Heart size={24} />,
      color: 'error'
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here's what's happening with your vehicle inventory.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography color="text.secondary" gutterBottom variant="body2">
                        {stat.title}
                      </Typography>
                      <Typography variant="h4" component="div">
                        {stat.value}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        {stat.positive ? (
                          <ArrowUpRight size={16} style={{ color: theme.palette.success.main }} />
                        ) : (
                          <ArrowDownRight size={16} style={{ color: theme.palette.error.main }} />
                        )}
                        <Typography
                          variant="body2"
                          sx={{
                            color: stat.positive ? 'success.main' : 'error.main',
                            fontWeight: 600
                          }}
                        >
                          {stat.change}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                          this month
                        </Typography>
                      </Box>
                    </Box>
                    <Avatar
                      sx={{
                        bgcolor: `${stat.color}.light`,
                        color: `${stat.color}.main`,
                        width: 56,
                        height: 56
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}

        {/* Charts Section */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: 400 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Monthly Performance
              </Typography>
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={dashboardData.chartData.monthly}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="vehicles" 
                    stackId="1"
                    stroke={theme.palette.primary.main} 
                    fill={theme.palette.primary.light}
                    name="New Vehicles"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="views" 
                    stackId="2"
                    stroke={theme.palette.secondary.main} 
                    fill={theme.palette.secondary.light}
                    name="Views"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Brand Distribution */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: 400 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Brand Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={dashboardData.chartData.brandDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  >
                    {dashboardData.chartData.brandDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Recent Activity
                </Typography>
                <Button size="small" endIcon={<MoreHorizontal size={16} />}>
                  View All
                </Button>
              </Box>
              <List dense>
                {dashboardData.recentActivity.map((activity) => (
                  <ListItem key={activity.id} sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.light' }}>
                        {getActivityIcon(activity.type)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={activity.description}
                      secondary={`${activity.user} • ${activity.timestamp}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Popular Vehicles */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Popular Vehicles
                </Typography>
                <Button size="small" endIcon={<MoreHorizontal size={16} />}>
                  View All
                </Button>
              </Box>
              <List dense>
                {dashboardData.popularVehicles.map((vehicle) => (
                  <ListItem key={vehicle.id} sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        src={vehicle.image}
                        sx={{ width: 48, height: 36 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={vehicle.title}
                      secondary={`$${vehicle.price.toLocaleString()}`}
                    />
                    <ListItemSecondaryAction>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="body2" color="primary">
                          {vehicle.views} views
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {vehicle.favorites} favorites
                        </Typography>
                      </Box>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Car size={20} />}
                    sx={{ py: 1.5 }}
                  >
                    Add Vehicle
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Upload size={20} />}
                    sx={{ py: 1.5 }}
                  >
                    Upload Media
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<ShoppingBag size={20} />}
                    sx={{ py: 1.5 }}
                  >
                    Manage Brands
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Users size={20} />}
                    sx={{ py: 1.5 }}
                  >
                    User Management
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EnhancedDashboard;
