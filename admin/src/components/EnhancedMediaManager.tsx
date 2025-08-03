import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    LinearProgress,
    TextField,
    Typography
} from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { FolderPlus, Upload } from 'lucide-react';
import React, { useCallback, useMemo, useState } from 'react';
import MediaGrid from './MediaGrid';
import MediaPreview from './MediaPreview';
import MediaToolbar from './MediaToolbar';

// Interface for media files
interface MediaFile {
  id: string;
  filename: string;
  originalName: string;
  mimetype: string;
  type: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  alt?: string;
  title?: string;
  description?: string;
  tags: string[];
  folder?: string;
  createdAt: string;
  updatedAt: string;
}

interface EnhancedMediaManagerProps {
  onFileSelect?: (files: MediaFile[]) => void;
  allowMultiple?: boolean;
  maxFileSize?: number;
  acceptedFileTypes?: string[];
}

const EnhancedMediaManager: React.FC<EnhancedMediaManagerProps> = ({
  onFileSelect,
  allowMultiple = true,
  acceptedFileTypes = ['image/*', 'video/*', 'application/pdf']
}) => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [previewFile, setPreviewFile] = useState<MediaFile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [createFolderOpen, setCreateFolderOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  // Sample data - replace with actual API call
  React.useEffect(() => {
    const sampleData: MediaFile[] = [
      {
        id: '1',
        filename: 'tesla-model-s.jpg',
        originalName: 'Tesla Model S Front View.jpg',
        mimetype: 'image/jpeg',
        type: 'image',
        size: 2048576,
        url: '/api/placeholder/400/300',
        thumbnailUrl: '/api/placeholder/200/150',
        alt: 'Tesla Model S front view',
        title: 'Tesla Model S',
        description: 'Front view of Tesla Model S',
        tags: ['tesla', 'electric', 'luxury'],
        folder: 'vehicles',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        filename: 'bmw-x5.jpg',
        originalName: 'BMW X5 SUV.jpg',
        mimetype: 'image/jpeg',
        type: 'image',
        size: 1856432,
        url: '/api/placeholder/400/300',
        thumbnailUrl: '/api/placeholder/200/150',
        alt: 'BMW X5 SUV',
        title: 'BMW X5',
        description: 'BMW X5 luxury SUV',
        tags: ['bmw', 'suv', 'luxury'],
        folder: 'vehicles',
        createdAt: '2024-01-14T15:20:00Z',
        updatedAt: '2024-01-14T15:20:00Z'
      }
    ];
    
    setFiles(sampleData);
  }, []);

  // Filter and search files
  const filteredFiles = useMemo(() => {
    let filtered = files;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(file => 
        file.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.originalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(file => file.type === filterType);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.title || a.originalName).localeCompare(b.title || b.originalName);
        case 'size':
          return b.size - a.size;
        case 'type':
          return a.type.localeCompare(b.type);
        default: // 'date'
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return filtered;
  }, [files, searchQuery, filterType, sortBy]);

  const handleFileUpload = useCallback(async (uploadedFiles: FileList) => {
    if (!uploadedFiles.length) return;

    setUploading(true);
    setError(null);

    try {
      // Simulate file upload
      const newFiles: MediaFile[] = Array.from(uploadedFiles).map((file, index) => ({
        id: `upload-${Date.now()}-${index}`,
        filename: file.name,
        originalName: file.name,
        mimetype: file.type,
        type: file.type.startsWith('image/') ? 'image' : 
              file.type.startsWith('video/') ? 'video' : 'document',
        size: file.size,
        url: URL.createObjectURL(file),
        thumbnailUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
        title: file.name.split('.')[0],
        description: '',
        tags: [],
        folder: 'uploads',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));

      setFiles(prev => [...newFiles, ...prev]);
    } catch (err) {
      setError('Failed to upload files. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  }, []);

  const handleBulkDelete = useCallback(() => {
    setFiles(prev => prev.filter(file => !selectedFiles.includes(file.id)));
    setSelectedFiles([]);
  }, [selectedFiles]);

  const handleBulkDownload = useCallback(() => {
    selectedFiles.forEach(fileId => {
      const file = files.find(f => f.id === fileId);
      if (file) {
        const link = document.createElement('a');
        link.href = file.url;
        link.download = file.originalName;
        link.click();
      }
    });
  }, [selectedFiles, files]);

  const handleFileUpdate = useCallback((id: string, updates: Partial<MediaFile>) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
    if (previewFile && previewFile.id === id) {
      setPreviewFile(prev => prev ? { ...prev, ...updates } : null);
    }
  }, [previewFile]);

  const handleFileDelete = useCallback((id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    if (previewFile?.id === id) {
      setPreviewFile(null);
    }
  }, [previewFile]);

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      // In a real app, this would create a folder via API
      console.log('Creating folder:', newFolderName);
      setNewFolderName('');
      setCreateFolderOpen(false);
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ 
        p: 3, 
        borderBottom: 1, 
        borderColor: 'divider',
        bgcolor: 'background.paper'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Media Manager
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Upload, organize, and manage your media files
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<FolderPlus size={16} />}
              onClick={() => setCreateFolderOpen(true)}
            >
              New Folder
            </Button>
            <Button
              variant="contained"
              startIcon={<Upload size={16} />}
              component="label"
            >
              Upload Files
              <input
                type="file"
                hidden
                multiple={allowMultiple}
                accept={acceptedFileTypes.join(',')}
                onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
              />
            </Button>
          </Box>
        </Box>

        {/* Upload Progress */}
        {uploading && (
          <Box sx={{ mb: 2 }}>
            <LinearProgress />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Uploading files...
            </Typography>
          </Box>
        )}

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
      </Box>

      {/* Toolbar */}
      <MediaToolbar
        searchTerm={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        filterType={filterType}
        onFilterChange={setFilterType}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        selectedItems={selectedFiles}
        onBulkUpload={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}
        onBulkDelete={handleBulkDelete}
        onBulkDownload={handleBulkDownload}
        onRefresh={() => window.location.reload()}
        totalItems={files.length}
        filteredItems={filteredFiles.length}
      />

      {/* Main Content */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        {loading ? (
          <Box sx={{ p: 3 }}>
            <LinearProgress />
            <Typography sx={{ mt: 2 }}>Loading media files...</Typography>
          </Box>
        ) : (
          <MediaGrid
            files={filteredFiles}
            viewMode={viewMode}
            selectedFiles={selectedFiles}
            onSelectionChange={setSelectedFiles}
            onFilePreview={setPreviewFile}
            onFileSelect={onFileSelect}
            allowMultiple={allowMultiple}
          />
        )}
      </Box>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewFile && (
          <MediaPreview
            media={previewFile}
            open={!!previewFile}
            onClose={() => setPreviewFile(null)}
            onDelete={handleFileDelete}
            onUpdate={handleFileUpdate}
          />
        )}
      </AnimatePresence>

      {/* Create Folder Dialog */}
      <Dialog open={createFolderOpen} onClose={() => setCreateFolderOpen(false)}>
        <DialogTitle>Create New Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Folder Name"
            fullWidth
            variant="outlined"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateFolderOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateFolder} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EnhancedMediaManager;
