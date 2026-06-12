import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        // Build state to track if error is captured
        this.state = { hasError: false, errorLog: null };
    }

    // 1. catches  crashes across child components
    static getDerivedStateFromError(error) {
        // renders next state as fallback UI
        return { hasError: true, errorLog: error.message };
    }

    // Log error meta data
    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary intercepted a rendering crash:", error, errorInfo);
    }

    render() {
        //  Gracefully display a "Fallback UI" if a crash occurred
        if (this.state.hasError) {
            return (
                <div style={{ padding: '20px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '12px', color: '#991b1b', margin: '10px 0' }}>
                    <h4 style={{ margin: '0 0 5px 0' }}> Widget Temporary Unavailable</h4>
                    <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>
                        This block encountered a layout compilation error and was isolated. The rest of your dashboard is safe.
                    </p>
                    <button
                        onClick={() => this.setState({ hasError: false })}
                        style={{ marginTop: '10px', padding: '4px 10px', fontSize: '0.75rem', background: '#991b1b', color: '#fff', border: 'none' }}
                    >
                        Attempt Reload
                    </button>
                </div>
            );
        }

        // If no errors occurred, render normally
        return this.props.children;
    }
}

export default ErrorBoundary;