    /* SplashScreen — saved for potential future use */
    /*
    function SplashScreen({ onComplete }) {
      const [visible, setVisible] = useState(true);
      const [gifUrl, setGifUrl] = useState(null);
      useEffect(() => { fetch('public/splashscreen.gif?v=' + Date.now()).then(r => { if (!r.ok) throw new Error('Failed to load'); return r.blob(); }).then(blob => { setGifUrl(URL.createObjectURL(blob)); }).catch(() => { setGifUrl('public/splashscreen.gif?v=' + Date.now()); }); }, []);
      useEffect(() => { if (!gifUrl) return; const timer = setTimeout(() => { setVisible(false); setTimeout(onComplete, 500); }, 2000); return () => clearTimeout(timer); }, [gifUrl, onComplete]);
      if (!gifUrl) return null;
      return (<div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease-in-out', pointerEvents: visible ? 'auto' : 'none'}}><img key={gifUrl} src={gifUrl} alt="Loading..." style={{width: '100vw', height: '100vh', objectFit: 'contain', maxWidth: '100%', maxHeight: '100%'}} /></div>);
    }
    */
