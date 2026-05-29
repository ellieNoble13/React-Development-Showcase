import {useState, useEffect} from "react";

const InteractiveCanvas = () => {
    //Hold current deminsons
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    //Detrimine weight based on a standard 760px tablet
    const isMobile = windowSize.width < 768;

    useEffect(() => {
        //Real-time Tracking
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        //Listener
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };

        }, []);
    // Dynamic style definitions dictated by current layout state
    const responsiveCardStyle = {
        padding: '40px 20px',
        borderRadius: '16px',
        transition: 'all 0.3s ease',
        backgroundColor: isMobile ? 'var(--accent)' : 'var(--card-bg)',
        color: isMobile ? '#ffffff' : 'var(--text-main)',
        border: isMobile ? 'none' : '1px solid var(--border)',
        boxShadow: '0 10px 30px var(--shadow)',
        width: '100%',
        maxWidth: '450px',
        textAlign: 'center'
    };

    return (
        <div className="studio-stage" style={{ justifyContent: 'center', minHeight: '60vh' }}>
            <div style={responsiveCardStyle}>
                <h2 style={{ color: 'inherit', marginBottom: '10px' }}>
                    {isMobile ? 'Mobile View' : 'Desktop View'}
                </h2>
                <p className={isMobile ? '' : 'text-muted'} style={{ fontSize: '0.9rem', marginBottom: '20px' }}>
                    The background color and layout configuration will shift at a 768px breakpoint.
                </p>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    background: 'rgba(0,0,0,0.05)',
                    padding: '15px',
                    borderRadius: '8px',
                    fontWeight: 'bold'
                }}>
                    <div>Width: <span style={{ fontFamily: 'monospace' }}>{windowSize.width}px</span></div>
                    <div>Height: <span style={{ fontFamily: 'monospace' }}>{windowSize.height}px</span></div>
                </div>
            </div>
        </div>
    );
};

export default InteractiveCanvas;