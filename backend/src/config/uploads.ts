import fs from 'fs';
import path from 'path';

export const setupUploads = () => {
  const uploadPath = process.env.UPLOAD_PATH || path.join(process.cwd(), 'uploads');
  
  // Create uploads directory if it doesn't exist
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
    console.log(`📁 Created uploads directory: ${uploadPath}`);
  }

  // Create subdirectories
  const subdirs = ['vehicles', 'brands', 'users'];
  subdirs.forEach(subdir => {
    const subdirPath = path.join(uploadPath, subdir);
    if (!fs.existsSync(subdirPath)) {
      fs.mkdirSync(subdirPath, { recursive: true });
      console.log(`📁 Created subdirectory: ${subdirPath}`);
    }
  });
};
