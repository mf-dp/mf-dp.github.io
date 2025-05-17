import React from 'react';

export function BackgroundImage() {
  // استایل برای کامپوننت پس‌زمینه
  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -100,
    overflow: 'hidden'
  };

  // استایل برای تصویر
  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    opacity: 0.9,
  };

  // استایل برای لایه شفاف روی تصویر
  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(2px)'
  };

  return (
    <div style={containerStyle}>
      <img 
        src="https://i.imgur.com/OsMMiKO.png" 
        alt="Site Background" 
        style={imageStyle}
      />
      <div style={overlayStyle}></div>
    </div>
  );
}

export default BackgroundImage;