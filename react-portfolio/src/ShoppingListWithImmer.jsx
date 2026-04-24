import { useImmer } from 'use-immer';
import { useState } from "react";

//Builds the first array
const ShoppingListWithImmer = () => {
    const [shoppingList, setShoppingList] = useImmer([
        {
            id: 1,
            name: "Strawberry Milk",
            quantity: 2,
            details: { category: "Milk", notes: "A Sweet Treat" }
        }
    ]);

    //Functions for setting the array
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState(1); //

    const addItem = () => {
        if (!name) return;
        setShoppingList(draft => {
            draft.push({ //creates draft using immer so it's easily to add stuff to, no spread syntax needed
                id: Date.now(),
                name: name,
                quantity: Number(quantity),
                details: { category: category || "General", notes: "" }
            });
        });
        setName("");
        setCategory("");
        setQuantity(1);
    };

    //updates each to key
     const updateItem = (id, key, value) => {
        setShoppingList(draft => {
            const item = draft.find(i => i.id === id);
            if (item) {
                if (key === 'notes') {
                    item.details.notes = value;
                } else {

                    item[key] = value;
                }
            }
        });
    };

    const removeItem = (id) => {
        setShoppingList(draft => {
            const index = draft.findIndex(i => i.id === id);
            if (index !== -1) draft.splice(index, 1);
        });
    };

    return (
        <div className="lab-card">
            <h2>Shopping List (Immer)</h2>

            <div className="button-grid" style={{ marginBottom: '30px' }}>
                <input
                    placeholder="Item Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Qty"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    style={{ width: '70px' }}
                />
                <button onClick={addItem} className="success-btn">Add Item</button>
            </div>

            <div style={{ textAlign: 'left' }}>
                {shoppingList.map(item => (
                    <div key={item.id} style={{
                        borderBottom: '1px solid #e5e7eb',
                        padding: '15px 0',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                            {/* Editable Name */}
                            <input
                                value={item.name}
                                onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                                style={{ fontWeight: '800', flex: 1 }} />
                            {/* Editable Quantity */}
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                                style={{ width: '50px', padding: '4px', textAlign: 'center', borderRadius: '5px', border: '1px solid #d1d5db' }}
                            />
                            <span className="subtitle" style={{ margin: 0 }}>{item.details.category}</span>
                        </div>

                        <input
                            placeholder="Add notes..."
                            value={item.details.notes}
                            onChange={(e) => updateItem(item.id, 'notes', e.target.value)}
                            style={{ fontSize: '0.8rem', padding: '8px' }}
                        />

                        <button
                            onClick={() => removeItem(item.id)}
                            className="fail-btn"
                            style={{ alignSelf: 'flex-start', padding: '5px 10px', fontSize: '0.7rem' }}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShoppingListWithImmer;