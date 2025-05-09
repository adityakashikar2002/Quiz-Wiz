import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import '../../styles/components/shared.css';

const QRCodeGenerator = ({ url }) => {
  const [qrCode, setQrCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const generateQR = async () => {
      try {
        const qr = await QRCode.toDataURL(url, { width: 200 });
        setQrCode(qr);
      } catch (err) {
        console.error(err);
      }
    };
    generateQR();
  }, [url]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="qr-code-container">
      <h3 style={{textAlign: 'center'}}>Share this quiz</h3>
      {qrCode && <img src={qrCode} alt="QR Code" className="qr-code-image" />}
      <div className="share-link">
        <input 
          type="text" 
          value={url} 
          readOnly 
          className="share-url-input" 
        />
        <button 
          onClick={copyToClipboard} 
          className="copy-btn"
        >
          {isCopied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
};

export default QRCodeGenerator;