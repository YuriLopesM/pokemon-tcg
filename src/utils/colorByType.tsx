type CardColor = {
    [key: string]: string
}

export default function colorByType(type: string) {
    const types: CardColor = {
        "Colorless": "#919AA2",
        "Darkness": "#5B5466",
        "Dragon": "#006FC9",
        "Fairy": "#FB89EB",
        "Fighting": "#E0306A",
        "Fire": "#FF9741",
        "Grass": "#38BF4B",
        "Lightning":"#FBD100",
        "Metal": "#5A8EA2",
        "Psychic": "#FF6675",
        "Water": "#3692DC",
    }

    return types[type] || types.Colorless;
}