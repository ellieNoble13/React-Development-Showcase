import {useState, useEffect, useRef} from 'react';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { evaluateDashboardThresholds, starterImages } from '../utils/dashboardHelpers';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const PokemonChart = () => {

    //starting values
    const [votes, setVotes] = useState({Bulbasaur:0, Charmander:0, Squirtle:0});
    const [secretSpawn, setSecretSpawn] = useState(null);

    const canvasRef = useRef(null);
    const chartInstanceRef = useRef(null);

    //Action Handler
    const handleVote = (pokemon) => {
        setVotes(prev => ({ ...prev, [pokemon]: prev[pokemon] + 1 }));
    };

    //Easter Egg
    const triggerSecretCheat = () => {
        setVotes({ Bulbasaur: 1, Charmander: 5, Squirtle: 1 });
    };

    // Vanilla JS Escape Hatch
    useEffect(() => {
        if (!canvasRef.current) return;

        const voteValues = [votes.Bulbasaur, votes.Charmander, votes.Squirtle];

        // Check if instance is empty
        if (!chartInstanceRef.current) {
            chartInstanceRef.current = new Chart(canvasRef.current, {
                type: 'bar',
                data: {
                    labels: ['Bulbasaur', 'Charmander', 'Squirtle'],
                    datasets: [{
                        label: 'Votes',
                        data: voteValues,
                        backgroundColor: ['#4ade80', '#f87171', '#60a5fa'],
                        borderWidth: 0,
                        borderRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
                }
            });
        } else {
            chartInstanceRef.current.data.datasets[0].data = voteValues;
            chartInstanceRef.current.update();
        }

        evaluateDashboardThresholds(voteValues, (url) => {
            setSecretSpawn(url);
        });

        /* If you attempt to make a new Chart() on the existing chart's canvas, it will cause collisions errors.
        This is become Chart.js's chaching of content bindings.  You need to flush the old layout with .destroy
        or you will have major graphical glitches or a memory leak
        */
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
        };
    }, [votes]);

    return (
        <div className="lab-card">
            <h2>Kanto Starter Poll</h2>
            <p className="text-muted text-small" style={{ marginBottom: '20px' }}>
                Cast your vote to update the vanilla canvas Chart.js renderer in real-time.
            </p>

            {/* Pokemon Cards Layout Selection Grid */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px' }}>
                {Object.keys(votes).map((name) => (
                    <div key={name} style={{ background: 'var(--bg-color)', padding: '15px', borderRadius: '12px', width: '110px', textAlign: 'center', border: '1px solid var(--border)' }}>
                        <img src={starterImages[name]} alt={name} style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                        <h4 style={{ margin: '8px 0 4px 0', fontSize: '0.9rem' }}>{name}</h4>
                        <p style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '8px' }}>{votes[name]} votes</p>
                        <button onClick={() => handleVote(name)} style={{ padding: '4px 10px', fontSize: '0.75rem' }}>Vote</button>
                    </div>
                ))}
            </div>

            {/* The Chart Canvas Wrapper */}
            <div style={{ position: 'relative', height: '220px', width: '100%', marginBottom: '20px', background: 'var(--bg-color)', borderRadius: '12px', padding: '10px', border: '1px solid var(--border)' }}>
                <canvas ref={canvasRef} />
            </div>

            {/* Secret Easter Egg Reveal Container */}
            {secretSpawn && (
                <div style={{ marginTop: '20px', padding: '15px', background: '#fef08a', borderRadius: '12px', border: '2px dashed #f59e0b' }}>
                    <h3 style={{ color: '#b45309', margin: '0 0 5px 0' }}> Special Encounter! </h3>
                    <img src={secretSpawn} alt="Mew" style={{ width: '120px', height: '120px', objectFit: 'contain' }} />
                    <p style={{ color: '#b45309', fontSize: '0.8rem', fontWeight: 'bold', margin: 0 }}>
                        A Wild Mew has appeared!
                    </p>
                </div>
            )}


            <div
                onClick={triggerSecretCheat}
                style={{ width: '15px', height: '15px', cursor: 'pointer', marginLeft: 'auto', opacity: 0.05 }}
                title="Dev Tool"
            />
        </div>
    );
};

export default PokemonChart;
