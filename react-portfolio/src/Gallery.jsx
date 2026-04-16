import { useState } from 'react';

export const images = [
    { id: 1, url: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Sandwich-making.JPG', description: 'Refreshing Cucumber Sandwich' },
    { id: 2, url: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Croque_monsieur.jpg', description: 'Decidant Croque Monsieur' },
    { id: 3, url: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Egg_and_cheese_breakfast_sandwich.jpg', description: 'Scrumptious Breakfast Sandwich' },
    { id: 4, url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Grilled_Cheese_%2844069260234%29.jpg', description: 'Classic Grilled Cheese' }
];

const Gallery = () => {
    const [index, setIndex] = useState(0);

    const handleNext = () => {
        if (index < images.length - 1) {
            setIndex(index + 1);
        }
    };

    const handlePrev = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    const recipe = images[index];

    return (
        <div className="lab-card">
            <h2>Sandwich Gallery</h2>

            <div className="recipe-card">
                <img src={recipe.url} alt={recipe.description} className="recipe-image" />
                <p className="recipe-description">{recipe.description}</p>
            </div>

            <div className="button-grid">
                <button
                    onClick={handlePrev}
                    disabled={index === 0}
                >
                    Previous
                </button>

                <span className="gallery-counter">
                    {index + 1} of {images.length}
                </span>

                <button
                    onClick={handleNext}
                    disabled={index === images.length - 1}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Gallery;