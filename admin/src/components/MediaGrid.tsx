import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardMedia,
    Checkbox,
    Chip,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Tooltip,
    Typography
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, File, Image as ImageIcon, Play, Video } from 'lucide-react';
import React, { useState } from 'react';
import { MediaFile } from '../types';

interface MediaGridProps {
  files: MediaFile[];
  viewMode: 'grid' | 'list';
  selectedFiles: string[];
  onSelectionChange: (selected: string[]) => void;
  onFilePreview: (file: MediaFile) => void;
  onFileSelect?: (files: MediaFile[]) => void;
  allowMultiple?: boolean;
}

const MediaGrid: React.FC<MediaGridProps> = ({
  files,
  viewMode,
  selectedFiles,
  onSelectionChange,
  onFilePreview,
  onFileSelect,
  allowMultiple = true
}) => {
  const [hoveredFile, setHoveredFile] = useState<string | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon size={24} />;
    if (type.startsWith('video/')) return <Video size={24} />;
    return <File size={24} />;
  };

  const handleFileClick = (file: MediaFile) => {
    if (onFileSelect) {
      const isSelected = selectedFiles.includes(file.id);
      let newSelection: string[];
      
      if (allowMultiple) {
        newSelection = isSelected 
          ? selectedFiles.filter(id => id !== file.id)
          : [...selectedFiles, file.id];
      } else {
        newSelection = isSelected ? [] : [file.id];
      }
      
      onSelectionChange(newSelection);
      
      if (onFileSelect) {
        const selectedFileObjects = files.filter(f => newSelection.includes(f.id));
        onFileSelect(selectedFileObjects);
      }
    } else {
      onFilePreview(file);
    }
  };

  const handleSelectAllChange = (checked: boolean) => {
    if (checked) {
      onSelectionChange(files.map(f => f.id));
    } else {
      onSelectionChange([]);
    }
  };

  const isAllSelected = files.length > 0 && selectedFiles.length === files.length;
  const isIndeterminate = selectedFiles.length > 0 && selectedFiles.length < files.length;

  if (viewMode === 'list') {
    return (
      <Box sx={{ p: 2 }}>
        {/* Select All Header */}
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Checkbox
            checked={isAllSelected}
            indeterminate={isIndeterminate}
            onChange={(e) => handleSelectAllChange(e.target.checked)}
          />
          <Typography variant="body2" color="text.secondary">
            Select All ({files.length} files)
          </Typography>
        </Box>

        <List>
          {files.map((file) => {
            const isSelected = selectedFiles.includes(file.id);
            
            return (
              <ListItem
                key={file.id}
                button
                onClick={() => handleFileClick(file)}
                sx={{ 
                  border: 1, 
                  borderColor: isSelected ? 'primary.main' : 'divider',
                  borderRadius: 1,
                  mb: 1,
                  bgcolor: isSelected ? 'primary.50' : 'background.paper'
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    src={file.thumbnailUrl || file.url}
                    sx={{ width: 48, height: 48 }}
                  >
                    {getFileIcon(file.mimetype)}
                  </Avatar>
                </ListItemAvatar>
                
                <ListItemText
                  primary={file.title || file.originalName}
                  secondary={
                    <Box>
                      <Typography variant="caption" display="block">
                        {formatFileSize(file.size)} • {file.mimetype}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Uploaded {new Date(file.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                  }
                />
                
                <ListItemSecondaryAction>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Preview">
                      <IconButton 
                        size="small" 
                        onClick={(e) => {
                          e.stopPropagation();
                          onFilePreview(file);
                        }}
                      >
                        <Play size={16} />
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="Download">
                      <IconButton 
                        size="small"
                        href={file.url}
                        download={file.originalName}
                      >
                        <Download size={16} />
                      </IconButton>
                    </Tooltip>
                    
                    <Checkbox
                      checked={isSelected}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleFileClick(file);
                      }}
                    />
                  </Box>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Box>
    );
  }

  // Grid View
  return (
    <Box sx={{ p: 2 }}>
      {/* Select All Header */}
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Checkbox
          checked={isAllSelected}
          indeterminate={isIndeterminate}
          onChange={(e) => handleSelectAllChange(e.target.checked)}
        />
        <Typography variant="body2" color="text.secondary">
          Select All ({files.length} files)
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <AnimatePresence>
          {files.map((file) => {
            const isSelected = selectedFiles.includes(file.id);
            
            return (
              <Grid item xs={6} sm={4} md={3} lg={2} key={file.id}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  onHoverStart={() => setHoveredFile(file.id)}
                  onHoverEnd={() => setHoveredFile(null)}
                >
                  <Card
                    sx={{
                      cursor: 'pointer',
                      border: 2,
                      borderColor: isSelected ? 'primary.main' : 'transparent',
                      '&:hover': {
                        boxShadow: 6,
                        transform: 'translateY(-2px)',
                        transition: 'all 0.2s ease-in-out'
                      },
                      bgcolor: isSelected ? 'primary.50' : 'background.paper'
                    }}
                    onClick={() => handleFileClick(file)}
                  >
                    {/* Media Preview */}
                    <Box sx={{ position: 'relative', aspectRatio: '1', overflow: 'hidden' }}>
                      {file.type === 'image' ? (
                        <CardMedia
                          component="img"
                          image={file.thumbnailUrl || file.url}
                          alt={file.alt || file.title}
                          sx={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover' 
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            bgcolor: 'grey.100'
                          }}
                        >
                          {getFileIcon(file.mimetype)}
                        </Box>
                      )}

                      {/* Overlay Controls */}
                      <AnimatePresence>
                        {(hoveredFile === file.id || isSelected) && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: 'rgba(0,0,0,0.5)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 8
                            }}
                          >
                            <Tooltip title="Preview">
                              <IconButton
                                size="small"
                                sx={{ bgcolor: 'rgba(255,255,255,0.9)' }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onFilePreview(file);
                                }}
                              >
                                <Play size={16} />
                              </IconButton>
                            </Tooltip>
                            
                            <Tooltip title="Download">
                              <IconButton
                                size="small"
                                sx={{ bgcolor: 'rgba(255,255,255,0.9)' }}
                                href={file.url}
                                download={file.originalName}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Download size={16} />
                              </IconButton>
                            </Tooltip>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Selection Checkbox */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 8,
                          left: 8
                        }}
                      >
                        <Checkbox
                          checked={isSelected}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(255,255,255,0.9)',
                            borderRadius: 0.5
                          }}
                          onClick={(e) => e.stopPropagation()}
                          onChange={() => handleFileClick(file)}
                        />
                      </Box>

                      {/* File Type Badge */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8
                        }}
                      >
                        <Chip
                          label={file.type.toUpperCase()}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(0,0,0,0.7)',
                            color: 'white',
                            fontSize: '0.7rem'
                          }}
                        />
                      </Box>
                    </Box>

                    {/* File Info */}
                    <CardContent sx={{ p: 1 }}>
                      <Typography
                        variant="caption"
                        component="div"
                        noWrap
                        sx={{ fontWeight: 600 }}
                      >
                        {file.title || file.originalName}
                      </Typography>
                      
                      <Typography variant="caption" color="text.secondary" noWrap>
                        {formatFileSize(file.size)}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </AnimatePresence>
      </Grid>

      {files.length === 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 200,
            color: 'text.secondary'
          }}
        >
          <File size={48} style={{ marginBottom: 16 }} />
          <Typography variant="h6" gutterBottom>
            No files found
          </Typography>
          <Typography variant="body2">
            Upload some files to get started
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default MediaGrid;
