import { useQuery } from "@tanstack/react-query";
import { useState } from 'react';

// API Fetching Functions
const fetchBreeds = () => fetch('https://dogapi.dog/api/v2/breeds').then(res => res.json());
const fetchFacts = () => fetch('https://dogapi.dog/api/v2/facts').then(res => res.json());
const fetchGroups = () => fetch('https://dogapi.dog/api/v2/groups').then(res => res.json());

const DogLaboratory = () => {
    const [selectedBreedId, setSelectedBreedId] = useState(null);

    // 1. Breeds List Query
    const {
        data: breedsData,
        isPending: breedsPending,
        isError: breedsError
    } = useQuery({ queryKey: ['breeds'], queryFn: fetchBreeds });

    // 2. Fact Query with Manual Refetch
    const {
        data: factsData,
        refetch: refetchFact,
        isFetching: isFetchingFact
    } = useQuery({ queryKey: ['facts'], queryFn: fetchFacts });

    // 3. Dependent Query for Breed Details
    const { data: breedDetail } = useQuery({
        queryKey: ['breed', selectedBreedId],
        queryFn: () => fetch(`https://dogapi.dog/api/v2/breeds/${selectedBreedId}`).then(res => res.json()),
        enabled: !!selectedBreedId,
    });

    // 4. Groups Query
    const { data: groupsData } = useQuery({ queryKey: ['groups'], queryFn: fetchGroups });

    // Global loading and error states for initial render
    if (breedsPending) return (
        <div className="status-indicator">
            <span className="pulse-dot"></span>
            Loading Dog Laboratory...
        </div>
    );

    if (breedsError) return (
        <div className="fail-btn" style={{ padding: '20px', borderRadius: '12px' }}>
            Error connecting to Dog API.
        </div>
    );

    return (
        <div className="lab-card" style={{ textAlign: 'left' }}>
            <h2>Dog API Explorer</h2>

            {/* Facts Section with Refresh Button */}
            <div style={{
                background: '#f0fdf4',
                padding: '15px',
                borderRadius: '12px',
                marginBottom: '20px',
                border: '1px solid #bbf7d0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '15px'
            }}>
                <div>
                    <p className="subtitle" style={{ color: '#16a34a' }}>Did You Know?</p>
                    <p style={{ fontSize: '0.9rem', fontStyle: 'italic', marginTop: '5px', lineHeight: '1.4' }}>
                        {isFetchingFact ? "Sniffing out a new fact..." : factsData?.data[0]?.attributes?.body}
                    </p>
                </div>
                <button
                    onClick={() => refetchFact()}
                    disabled={isFetchingFact}
                    style={{
                        padding: '6px 12px',
                        fontSize: '0.7rem',
                        whiteSpace: 'nowrap',
                        flexShrink: 0
                    }}
                >
                    {isFetchingFact ? "Loading..." : "New Fact"}
                </button>
            </div>

            {/* Grid Layout for Breeds and Details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

                {/* Breeds List */}
                <div>
                    <p className="subtitle">Select a Breed</p>
                    <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                        {breedsData?.data.map(breed => (
                            <div
                                key={breed.id}
                                onClick={() => setSelectedBreedId(breed.id)}
                                style={{
                                    padding: '8px',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem',
                                    transition: 'background 0.2s',
                                    background: selectedBreedId === breed.id ? '#ced2ef' : 'transparent',
                                    color: '#1d1d1f'
                                }}
                            >
                                {breed.attributes.name}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Breed Detail Panel */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p className="subtitle">Breed Details</p>
                    {breedDetail ? (
                        <div style={{
                            fontSize: '0.8rem',
                            maxHeight: '200px',
                            overflowY: 'auto',
                            paddingRight: '10px'
                        }}>
                            <strong style={{ display: 'block', marginBottom: '8px', fontSize: '1rem' }}>
                                {breedDetail.data.attributes.name}
                            </strong>
                            <p style={{ lineHeight: '1.4', color: '#4b5563' }}>
                                {breedDetail.data.attributes.description}
                            </p>
                        </div>
                    ) : (
                        <p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Select a breed to see details.</p>
                    )}
                </div>
            </div>

            {/* Dog Groups Section */}
            <div style={{ marginTop: '20px', borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
                <p className="subtitle">Dog Groups</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                    {groupsData?.data.map(group => (
                        <span
                            key={group.id}
                            style={{
                                background: '#f3f4f6',
                                padding: '4px 10px',
                                borderRadius: '20px',
                                fontSize: '0.7rem',
                                fontWeight: '700',
                                color: '#4b5563',
                                border: '1px solid #d1d5db'
                            }}
                        >
                            {group.attributes.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DogLaboratory