import React, { useState } from 'react';
import '../info.css';

export default function Info() {
  const [iframeSrc, setIframeSrc] = useState('https://ggzecademy.nl/ggz/productcatalogus/');

  return (
    <>
      <iframe
        src={iframeSrc}
        style={{ width: '108%', height: '100vh' }}
        frameBorder="0"
      ></iframe>
    </>
  );
}
