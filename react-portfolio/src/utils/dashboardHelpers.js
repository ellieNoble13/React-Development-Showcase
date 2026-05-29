
export const evaluateDashboardThresholds = (dataArray, triggerCallback) => {
    if (!dataArray || dataArray.length < 3) return;

    const matchFirst = dataArray[0] === 1;
    const matchSecond = dataArray[1] === 5;
    const matchThird = dataArray[2] === 1;

    if (matchFirst && matchSecond && matchThird) {

        const spriteUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png";
        triggerCallback(spriteUrl);
    } else {
        triggerCallback(null);
    }
};


export const starterImages = {
    Bulbasaur: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    Charmander: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    Squirtle: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
};