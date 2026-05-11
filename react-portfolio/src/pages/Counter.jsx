import { useState } from 'react';

const Counter = () => {
    const [count, setCount] = useState(0);


    const handleIncrement = () => {
        setCount(count + 1);

    };
    const handleIncrementAfterDelay = () => {
        setTimeout(() => {
            setCount(count + 1);
        }, 2000)
    };
    const handleIncrementTwice = () => {
        setCount(count + 1);
        setCount(count + 1);
    };
    const handleCorrectIncrementTwice = () => {
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
    };

    return (
        <div className="lab-card">
            <h2>Counters</h2>
            <div className="count-display">{count}</div>

            <div className="button-grid">
                <button onClick={handleIncrement}>Increment</button>
                <button onClick={handleIncrementAfterDelay}>Increment After Delay</button>
                <button onClick={handleIncrementTwice} className="fail-btn">Increment Twice (Incorrect)</button>
                <button onClick={handleCorrectIncrementTwice} className="success-btn">Increment Twice (Correct)</button>
            </div>
        </div>
    );
}


export default Counter;
