type Bet = {
    name: string,
    description: string,
    curOdds: Odds,
}

type BetMade = {
    userID: string,
    pickedOption: string,
    date: Date,
}

type Odds = {
    date: Date,
    odds_by_label: Record<string, number>,
}

const mockBets = new Map<string, Bet & { odds_history: Odds[],  }>([
    ["szmutni-bejon", {
        name: "Szmutni bejön", description: "Szmutni bejön-e október 13-án?", curOdds: {
            date: new Date("2026.10.11 12:00:00"),
            odds_by_label: {
                "Igen": 1.2,
                "Nem": 2,
            }
        },
    }]
])

export const getBets = () => {
    return mockBets;
}

export const getMyBets = () => {}