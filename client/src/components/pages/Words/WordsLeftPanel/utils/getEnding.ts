function getEnding(wordsAmount: number): string {
    const lastNumber = wordsAmount % 10;
    const lastTwoNumbers = wordsAmount % 100;

    if (lastTwoNumbers > 10 && lastTwoNumbers < 20) return 'слов';

    if (lastNumber > 1 && lastNumber < 5) return 'слова';

    if (lastNumber === 1) return 'слово';

    return 'слов';
}

export default getEnding;
