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
        <div className="fail-btn alert-box">
            Error connecting to Dog API.
        </div>
    );

    return (
        <div className="lab-card text-left">
            <h2>Dog API Explorer</h2>

            {/* Facts Section with Refresh Button */}
            <div className="info-panel success-theme">
                <div>
                    <p className="subtitle">Did You Know?</p>
                    <p className="text-small text-italic mt-2">
                        {isFetchingFact ? "Sniffing out a new fact..." : factsData?.data[0]?.attributes?.body}
                    </p>
                </div>
                <button
                    onClick={() => refetchFact()}
                    disabled={isFetchingFact}
                    className="btn-small"
                >
                    {isFetchingFact ? "Loading..." : "New Fact"}
                </button>
            </div>

            {/* Grid Layout for Breeds and Details */}
            <div className="grid-halves">

                {/* Breeds List */}
                <div>
                    <p className="subtitle">Select a Breed</p>
                    <div className="scroll-list mt-2">
                        {breedsData?.data.map(breed => (
                            <div
                                key={breed.id}
                                onClick={() => setSelectedBreedId(breed.id)}
                                className={`list-item ${selectedBreedId === breed.id ? 'selected' : ''}`}
                            >
                                {breed.attributes.name}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Breed Detail Panel */}
                <div>
                    <p className="subtitle">Breed Details</p>
                    {breedDetail ? (
                        <div className="detail-body mt-2">
                            <strong>
                                {breedDetail.data.attributes.name}
                            </strong>
                            <p>
                                {breedDetail.data.attributes.description}
                            </p>
                        </div>
                    ) : (
                        <p className="text-small text-muted mt-2">Select a breed to see details.</p>
                    )}
                </div>
            </div>

            {/* Dog Groups Section */}
            <div className="section-divider">
                <p className="subtitle">Dog Groups</p>
                <div className="flex-wrap-gap mt-2">
                    {groupsData?.data.map(group => (
                        <span
                            key={group.id}
                            className="pill"
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