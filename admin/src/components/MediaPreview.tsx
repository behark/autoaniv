import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    TextField,
    Typography
} from '@mui/material';
import { motion } from 'framer-motion';
import {
    Copy,
    Download,
    Edit3,
    ExternalLink,
    File,
    Image as ImageIcon,
    Video,
    X
} from 'lucide-react';
import React, { useState } from 'react';
import { MediaFile } from '../types';

export interface MediaPreviewProps {
  media: MediaFile | null;
  open: boolean;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<MediaFile>) => void;
  onDelete: (id: string) => void;
}

const MediaPreview: React.FC<MediaPreviewProps> = ({
  media,
  open,
  onClose,
  onUpdate,
  onDelete
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: '',
    alt: '',
    description: ''
  });

  React.useEffect(() => {
    if (media) {
      setEditData({
        title: media.title || '',
        alt: media.alt || '',
        description: media.description || ''
      });
    }
  }, [media]);

  if (!media) return null;

  const handleSave = () => {
    onUpdate(media.id, editData);
    setIsEditing(false);
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(media.url);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon size={20} />;
    if (type.startsWith('video/')) return <Video size={20} />;
    return <File size={20} />;
  };

  const renderPreview = () => {
    if (media.type.startsWith('image/')) {
      return (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 300,
            bgcolor: 'grey.50',
            borderRadius: 1,
            overflow: 'hidden'
          }}
        >
          <motion.img
            src={media.url}
            alt={media.alt || media.title}
            style={{
              maxWidth: '100%',
              maxHeight: '400px',
              objectFit: 'contain'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </Box>
      );
    }

    if (media.type.startsWith('video/')) {
      return (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 300,
            bgcolor: 'grey.50',
            borderRadius: 1,
            overflow: 'hidden'
          }}
        >
          <video
            src={media.url}
            controls
            style={{
              maxWidth: '100%',
              maxHeight: '400px'
            }}
          />
        </Box>
      );
    }

    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 300,
          bgcolor: 'grey.50',
          borderRadius: 1,
          gap: 2
        }}
      >
        {getFileIcon(media.type)}
        <Typography variant="h6" color="text.secondary">
          {media.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Preview not available for this file type
        </Typography>
      </Box>
    );
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: { minHeight: '70vh' }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 1
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {getFileIcon(media.type)}
          <Typography variant="h6" component="span">
            {media.title || 'Untitled'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton 
            size="small" 
            onClick={() => setIsEditing(!isEditing)}
            color={isEditing ? 'primary' : 'default'}
          >
            <Edit3 size={18} />
          </IconButton>
          <IconButton size="small" onClick={onClose}>
            <X size={18} />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 3 }}>
          {/* Preview */}
          <Box sx={{ mb: 3 }}>
            {renderPreview()}
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Metadata */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              {isEditing ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Title"
                    value={editData.title}
                    onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                    fullWidth
                    size="small"
                  />
                  <TextField
                    label="Alt Text"
                    value={editData.alt}
                    onChange={(e) => setEditData(prev => ({ ...prev, alt: e.target.value }))}
                    fullWidth
                    size="small"
                    helperText="Describe this image for accessibility"
                  />
                  <TextField
                    label="Description"
                    value={editData.description}
                    onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                    fullWidth
                    multiline
                    rows={3}
                    size="small"
                  />
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {media.alt && (
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Alt Text
                      </Typography>
                      <Typography variant="body2">
                        {media.alt}
                      </Typography>
                    </Box>
                  )}
                  {media.description && (
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Description
                      </Typography>
                      <Typography variant="body2">
                        {media.description}
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    File Details
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">Size:</Typography>
                      <Typography variant="body2">{formatFileSize(media.size)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">Type:</Typography>
                      <Chip label={media.type} size="small" />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">Uploaded:</Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                        {formatDate(media.createdAt)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Actions
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Button
                      size="small"
                      startIcon={<Copy size={16} />}
                      onClick={handleCopyUrl}
                      variant="outlined"
                    >
                      Copy URL
                    </Button>
                    <Button
                      size="small"
                      startIcon={<Download size={16} />}
                      href={media.url}
                      download={media.title}
                      variant="outlined"
                    >
                      Download
                    </Button>
                    <Button
                      size="small"
                      startIcon={<ExternalLink size={16} />}
                      href={media.url}
                      target="_blank"
                      variant="outlined"
                    >
                      Open in New Tab
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        {isEditing ? (
          <>
            <Button onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} variant="contained">
              Save Changes
            </Button>
          </>
        ) : (
          <>
            <Button 
              onClick={() => onDelete(media.id)} 
              color="error"
              variant="outlined"
            >
              Delete
            </Button>
            <Button onClick={onClose} variant="contained">
              Close
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default MediaPreview;
