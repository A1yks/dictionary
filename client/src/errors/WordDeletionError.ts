class WordDeletionError extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'WordDeletionError';
	}
}

export default WordDeletionError;
