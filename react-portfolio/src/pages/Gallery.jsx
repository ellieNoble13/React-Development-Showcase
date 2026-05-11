import { Link } from 'react-router-dom';
import { recipes } from '../data/recipes';

const Gallery = () => {
    return (
        <div className="lab-card">
            <h2 className="main-title">Sandwich Gallery</h2>
            <p className="subtitle">Click a recipe to view preparation details</p>

            <div className="grid-halves mt-2">
                {recipes.map((recipe) => (
                    <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="list-item" style={{ textDecoration: 'none' }}>
                        <img
                            src={recipe.url}
                            alt={recipe.title}
                            style={{ width: '100%', borderRadius: '8px', height: '120px', objectFit: 'cover' }}
                        />
                        <strong style={{ display: 'block', marginTop: '10px' }}>{recipe.title}</strong>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Gallery;