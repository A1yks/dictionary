class WordAlreadyAddedError extends Error {
	constructor(msg?: string) {
		super(msg);
		this.name = 'WordAlreadyAddedError';
	}
}

export default WordAlreadyAddedError;
