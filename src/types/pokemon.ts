export type TypeResponse = {
    data: {
        data: Types
    }
}

export type Types = [
    "Colorless",
    "Darkness",
    "Dragon",
    "Fairy",
    "Fighting",
    "Fire",
    "Grass",
    "Lightning",
    "Metal",
    "Psychic",
    "Water"
]

export type CardResponse = {
    data: {
        data: Card
    }
}

export type Card = {
    id: string,
    name: string,
    subtypes: string[],
    attacks: Attack[]
    weaknesses: [{
        type: string,
        value: string
    }],
    images: {
        small: string
    }
}

export type Attack = {
    name: string,
    text: string,
    cost: string[],
    damage: string,
}