import {
    Box,
    Button,
    ButtonGroup,
    Chip,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Tooltip
} from '@mui/material';
import {
    Download,
    Grid,
    List,
    RefreshCw,
    Search,
    Trash2,
    Upload
} from 'lucide-react';
import React from 'react';

export interface MediaToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  filterType: string;
  onFilterChange: (value: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  selectedItems: string[];
  onBulkUpload: () => void;
  onBulkDelete: () => void;
  onBulkDownload: () => void;
  onRefresh: () => void;
  totalItems: number;
  filteredItems: number;
}

const MediaToolbar: React.FC<MediaToolbarProps> = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  filterType,
  onFilterChange,
  viewMode,
  onViewModeChange,
  selectedItems,
  onBulkUpload,
  onBulkDelete,
  onBulkDownload,
  onRefresh,
  totalItems,
  filteredItems
}) => {
  return (
    <Box 
      sx={{ 
        p: 2, 
        borderBottom: 1, 
        borderColor: 'divider',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
        alignItems: 'center',
        bgcolor: 'background.paper'
      }}
    >
      {/* Search */}
      <TextField
        placeholder="Search media files..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        size="small"
        sx={{ 
          minWidth: 250,
          flex: { xs: '1 1 100%', md: '1 1 auto' }
        }}
        InputProps={{
          startAdornment: <Search size={20} style={{ marginRight: 8, color: '#666' }} />
        }}
      />

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={filterType}
            onChange={(e) => onFilterChange(e.target.value)}
            label="Type"
          >
            <MenuItem value="all">All Types</MenuItem>
            <MenuItem value="image">Images</MenuItem>
            <MenuItem value="video">Videos</MenuItem>
            <MenuItem value="document">Documents</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            label="Sort By"
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="size">Size</MenuItem>
            <MenuItem value="type">Type</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* View Mode Toggle */}
      <ButtonGroup size="small" variant="outlined">
        <Button
          onClick={() => onViewModeChange('grid')}
          variant={viewMode === 'grid' ? 'contained' : 'outlined'}
        >
          <Grid size={16} />
        </Button>
        <Button
          onClick={() => onViewModeChange('list')}
          variant={viewMode === 'list' ? 'contained' : 'outlined'}
        >
          <List size={16} />
        </Button>
      </ButtonGroup>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Chip 
            label={`${selectedItems.length} selected`} 
            size="small" 
            color="primary"
          />
          <Tooltip title="Download Selected">
            <IconButton size="small" onClick={onBulkDownload}>
              <Download size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Selected">
            <IconButton size="small" onClick={onBulkDelete} color="error">
              <Trash2 size={16} />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
        <Tooltip title="Upload Files">
          <Button
            variant="contained"
            size="small"
            onClick={onBulkUpload}
            startIcon={<Upload size={16} />}
          >
            Upload
          </Button>
        </Tooltip>
        
        <Tooltip title="Refresh">
          <IconButton size="small" onClick={onRefresh}>
            <RefreshCw size={16} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Stats */}
      <Box sx={{ 
        fontSize: '0.875rem', 
        color: 'text.secondary',
        whiteSpace: 'nowrap'
      }}>
        {filteredItems !== totalItems ? (
          <>Showing {filteredItems} of {totalItems} files</>
        ) : (
          <>{totalItems} files</>
        )}
      </Box>
    </Box>
  );
};

export default MediaToolbar;
