class NoSuchLanguageError extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'NoSuchLanguageError';
	}
}

export default NoSuchLanguageError;
