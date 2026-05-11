import { useParams, Link } from 'react-router-dom';
import { recipes } from '../data/recipes';

const RecipeDetail = () => {
    const { id } = useParams();
    const recipe = recipes.find(r => r.id === parseInt(id));

    if (!recipe) return <div className="lab-card"><h2>Recipe not found!</h2><Link to="/lab/gallery">Back to Gallery</Link></div>;

    return (
        <div className="lab-card text-left">
            <h2 className="main-title">{recipe.title}</h2>

            <div className="recipe-card">
                <img src={recipe.url} alt={recipe.title} className="recipe-image" />

                <div className="section-divider mt-2">
                    <p className="subtitle" style={{ fontSize: '0.7rem' }}>Preparation Instructions</p>
                    <p className="text-muted" style={{ lineHeight: '1.6' }}>
                        {recipe.instructions}
                    </p>
                </div>
            </div>

            <Link to="/lab/gallery" className="success-btn btn-small mt-2" style={{ textDecoration: 'none', display: 'inline-block' }}>
                ← Back to Gallery
            </Link>
        </div>
    );
};

export default RecipeDetail;