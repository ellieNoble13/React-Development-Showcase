import { useState, useEffect } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';

// Container for Fragile widget
const FragilePokemonWidget = () => {
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [apiEndpoint, setApiEndpoint] = useState('https://pokeapi.co/api/v2/pokemon/79'); // Slowpoke endpoint

    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        fetch(apiEndpoint)
            .then(res => {
                if (!res.ok) {
                    // Trigger a network failure mode
                    throw new Error(`HTTP Error Status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                if (isMounted) {
                    setPokemon(data);
                    setLoading(false);
                }
            })
            .catch(err => {
                // Forces state to update with wrong properties on catch, triggers a natural Javascript rendering crash below.
                if (isMounted) {
                    setPokemon({ unresolvableCrashTrigger: true });
                    setLoading(false);
                }
            });

        return () => { isMounted = false; };
    }, [apiEndpoint]);

    // Intentional rendering crash check
    if (pokemon && pokemon.unresolvableCrashTrigger) {
        // This will attempt to read a property that doesn't exist, exploding the render loop
        return <div>{pokemon.data.nested.corruptedProperties}</div>;
    }

    if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading live data...</div>;

    return (
        <div style={{ padding: '20px', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0', textTransform: 'capitalize' }}> Live API: {pokemon?.name}</h3>
            <img    
                src={pokemon?.sprites?.other?.['official-artwork']?.front_default}
                alt={pokemon?.name}
                style={{ width: '80px', height: '80px', objectFit: 'contain', margin: '10px 0' }}
            />
            <p className="text-muted" style={{ fontSize: '0.8rem', marginBottom: '15px' }}>
                Base Experience: {pokemon?.base_experience}
            </p>
            <button
                onClick={() => setApiEndpoint('https://pokeapi.co/api/v2/broken-endpoint-path/error')}
                style={{ padding: '6px 12px', fontSize: '0.8rem', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', width: '100%' }}
            >
                Corrupt API Payload
            </button>
        </div>
    );
};

// Main Lab Dashboard Panel
const FaultToleranceLab = () => {
    return (
        <div className="lab-card text-left">
            <h2>Error Boundary Isolation Lab</h2>
            <p className="text-muted text-small" style={{ marginBottom: '25px' }}>
                This layout tests live API stream integration. If the remote payload breaks, the <code>ErrorBoundary</code> capsule catches the crash instantly.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

                {/* Wrapped Inside the Guard Pillar */}
                <div>
                    <h4 style={{ marginBottom: '10px' }}>Protected Live Stream</h4>
                    <ErrorBoundary>
                        <FragilePokemonWidget />
                    </ErrorBoundary>
                </div>

                {/* Stable Static Dashboard Metric */}
                <div style={{ padding: '20px', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px' }}>
                    <h3>Application Control Hub</h3>
                    <p className="text-muted" style={{ fontSize: '0.8rem' }}>
                        This sidebar runs entirely independently. If the weather, video game, or Pokémon API crashes, this interface stays fully interactive.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default FaultToleranceLab;