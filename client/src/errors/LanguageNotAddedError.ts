class LanguageNotAddedError extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'LanguageNotAddedError';
	}
}

export default LanguageNotAddedError;
