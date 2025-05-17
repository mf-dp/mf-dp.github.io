import React from 'react';

const backgroundStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -10,
  backgroundImage: "url('/background.png')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -5,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  backdropFilter: 'blur(2px)',
};

export function Background() {
  return (
    <>
      <div style={backgroundStyle}></div>
      <div style={overlayStyle}></div>
    </>
  );
}

export default Background;