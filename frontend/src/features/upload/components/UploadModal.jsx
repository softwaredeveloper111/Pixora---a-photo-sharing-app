import React, { useState, useRef } from 'react';
import { X, Upload, Image, ArrowRight } from 'lucide-react';
import styles from './UploadModal.module.css';

const UploadModal = ({ onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload an image file (PNG, JPG, WEBP).');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleTriggerUpload = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imagePreview) {
      alert('Please select or drop an image first.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Post created successfully! (Mock)');
      onClose();
    }, 1500);
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <header className={styles.modalHeader}>
          <h3>Create new post</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={18} />
          </button>
        </header>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          
          {/* Left / Top Side: Drag & Drop Dropzone */}
          <div className={styles.formLeft}>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*"
              className={styles.hiddenInput} 
              onChange={handleFileChange}
            />

            {!imagePreview ? (
              <div 
                className={`${styles.dropzone} ${dragActive ? styles.dropzoneActive : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={handleTriggerUpload}
              >
                <div className={styles.dropzoneInfo}>
                  <Upload size={32} className={styles.uploadIcon} />
                  <p className={styles.dropzoneText}>Drag & drop photo here</p>
                  <span className={styles.dropzoneSubtext}>or click to browse from system</span>
                  <span className={styles.allowedSpecs}>Supports JPEG, PNG, WEBP up to 10MB</span>
                </div>
              </div>
            ) : (
              <div className={styles.previewContainer}>
                <img src={imagePreview} alt="upload preview" className={styles.previewImage} />
                <button 
                  type="button" 
                  className={styles.changePhotoBtn} 
                  onClick={handleTriggerUpload}
                >
                  Change Photo
                </button>
              </div>
            )}
          </div>

          {/* Right / Bottom Side: Post details input fields */}
          <div className={styles.formRight}>
            <div className={styles.inputGroup}>
              <label htmlFor="caption">Caption</label>
              <textarea
                id="caption"
                rows="4"
                placeholder="What's on your mind? Add detail..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="tags">Hashtags</label>
              <input
                type="text"
                id="tags"
                placeholder="e.g. #minimal #workspace #geometry"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            {/* Actions Panel */}
            <div className={styles.actionFooter}>
              <button 
                type="button" 
                className={styles.cancelBtn} 
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              
              <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={isSubmitting || !imagePreview}
              >
                {isSubmitting ? (
                  <span>Publishing...</span>
                ) : (
                  <>
                    <span>Share Post</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
