class WordNotAddedError extends Error {
	constructor(msg?: string) {
		super(msg);
		this.name = 'WordNotAddedError';
	}
}

export default WordNotAddedError;
