// import React from 'react';

interface Phrase {
    id: number;
    text: string;
}

interface RandomPhrasesProps {
    username: string;
}

export default function RandomPhrases({ username }: RandomPhrasesProps) {
    const phrases: Phrase[] = [
        {id: 1, text: "Congrats!!!"}, 
        {id: 2, text: "YAY!"}, 
        {id: 3, text: "Never give up!"},
        {id: 4, text: "URAHHHH"}
    ];

    const getRandomPhrase = (): Phrase => {
        const randomIndex = Math.floor(Math.random() * phrases.length);
        return phrases[randomIndex];
    };

    const randomPhrase = getRandomPhrase();

    return (
        <div>
            <h2>{randomPhrase.text} {username}!</h2>
        </div>
    );
}