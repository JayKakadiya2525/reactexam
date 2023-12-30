import React, { useState, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import AvatarEditor from 'react-avatar-editor';
import 'react-image-crop/dist/ReactCrop.css';
import { useDarkMode } from '../DarkModeContext';
import { FaSearchPlus, FaSearchMinus, FaCrop, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import '../Tab/css/Post.scss';

const Post = () => {

  const { isDarkMode } = useDarkMode();

  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');
  const [fileType, setFileType] = useState('');
  const [croppedImageData, setCroppedImageData] = useState(null);
  const [crop, setCrop] = useState({ aspect: 3 / 3, zoom: 1 });
  const [initialCrop, setInitialCrop] = useState(null);
  const [image, setImage] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const editorRef = useRef();

  useEffect(() => {
    return () => clearInterval(); // Clear any specific interval if needed
  }, [file]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileObject = e.target.files[0];
      setFilename(fileObject.name);

      const reader = new FileReader();
      reader.onloadend = () => {
        const arr = new Uint8Array(reader.result).subarray(0, 4);
        const header = [...arr].map((byte) => byte.toString(16)).join('').toUpperCase();

        let detectedType = '';

        switch (header) {
          case '89504E47':
            detectedType = 'image/png';
            break;
          case '47494638':
            detectedType = 'image/gif';
            break;
          case 'FFD8FFE0':
          case 'FFD8FFE1':
          case 'FFD8FFE2':
          case 'FFD8FFE3':
          case 'FFD8FFE8':
            detectedType = 'image/jpeg';
            break;
          default:
            // Use the default type if the type cannot be determined
            detectedType = '.jpeg';
        }

        setFileType(detectedType);

        // Use URL.createObjectURL to create a URL for the image file
        const imageUrl = URL.createObjectURL(fileObject);

        const img = new Image();
        img.src = imageUrl;

        img.onload = () => {
          const maxWidth = 400;
          const maxHeight = 400;

          let newWidth = img.width;
          let newHeight = img.height;

          if (newWidth > maxWidth) {
            const ratio = maxWidth / newWidth;
            newWidth = maxWidth;
            newHeight *= ratio;
          }

          if (newHeight > maxHeight) {
            const ratio = maxHeight / newHeight;
            newHeight = maxHeight;
            newWidth *= ratio;
          }

          setImage(imageUrl);
          setIsImageSelected(true);
          setInitialCrop({ aspect: 1, width: newWidth, height: newHeight, zoom: 1 });
        };
      };

      reader.readAsArrayBuffer(fileObject);
    }
  };
  // ...


  const uploadfile = (evt) => {
    if (!croppedImageData) {
      alert('Please crop the image before uploading.');
      return;
    }

    evt.target.disabled = true;

    const imageDataWithoutPrefix = croppedImageData.split(',')[1];

    fetch('http://localhost:8080/upload', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ name: filename, type: fileType, data: imageDataWithoutPrefix }),
    })

      .then((response) => {
        if (response.ok) {
          console.log('Upload successful');
          evt.target.disabled = false;
          window.location.href = "/";
        } else {
          console.error('Upload failed:', response.statusText);
          alert('Uplaod faild...');
        }
      })
      .catch((e) => {
        console.error('Error during upload:', e);
      });
  };

  const handleCrop = () => {
    const canvas = editorRef.current.getImageScaledToCanvas();
    const imageData = canvas.toDataURL();
    setCroppedImageData(imageData);
  };

  const handleBack = () => {
    setCrop(initialCrop);
    setCroppedImageData(null);
  };

  const modalStyle = {
    backgroundColor: isDarkMode ? '#262e35' : '#F5F7FB',
    position: 'fixed',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const containerStyle = {
    backgroundColor: '#fff',
    borderRadius: '10px',
  };

  const cropAreaStyle = {
    backgroundColor: isDarkMode ? '#EFECF1' : '#262E35',
    borderRadius: '5px',
  };

  const zoomControlsStyle = {
    display: 'flex'
  };

  const previewStyle = {
    textAlign: 'center',
    backgroundColor: isDarkMode ? '#EFECF1' : '#262E35',
  };

  const canvas = {
    backgroundColor: isDarkMode ? '#262E35' : '#EFECF1',
  }

  return (
    <React.Fragment key={isDarkMode}>
      <div style={modalStyle}>
        <div style={containerStyle}>

          {!isImageSelected && (
            <div>
              <label htmlFor="fileInput" className="btn btn-primary">
                Choose File
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
          )}

          {isImageSelected && !croppedImageData && (
            <div style={cropAreaStyle}>
              <ReactCrop
                src={image}
                crop={crop}
                onChange={(newCrop) => setCrop(newCrop)}
              />

              <div className="flex-column justify-content-between align-items-center">
                <AvatarEditor
                  ref={editorRef}
                  style={canvas}
                  image={image}
                  width={400}
                  height={400}
                  border={50}
                  color={[255, 255, 255, 0.5]}
                  scale={crop.zoom}
                  rotate={0}
                  crossOrigin="anonymous"
                  className="canvas-img" // Bootstrap class for responsive images
                />
                <div style={zoomControlsStyle} className="justify-content-around p-lg-2 p-3">
                  <button className="btn btn-secondary" onClick={() => setCrop({ ...crop, zoom: crop.zoom + 0.1 })}>
                    <FaSearchPlus />
                  </button>
                  <button className="btn btn-primary" onClick={handleCrop}>
                    <FaCrop />
                  </button>
                  <button className="btn btn-secondary" onClick={() => setCrop({ ...crop, zoom: crop.zoom - 0.1 })}>
                    <FaSearchMinus />
                  </button>
                </div>
              </div>
            </div>
          )}

          {croppedImageData && (
            <div className="p-3" style={previewStyle}>
              <img
                src={croppedImageData}
                alt="Cropped Preview"
                style={{ width: '100%', maxWidth: '100%', height: 'auto' }} // Limit width to 3000px, maintain aspect ratio
              />
              <div className="justify-content-around d-flex mt-3">
                <button className="btn btn-secondary" onClick={handleBack}>
                  <FaArrowLeft />
                </button>
                <button className="btn btn-success" onClick={uploadfile}>
                  <FaArrowRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Post;
































