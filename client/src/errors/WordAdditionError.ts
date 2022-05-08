class WordAdditionError extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'WordAdditionError';
	}
}

export default WordAdditionError;
