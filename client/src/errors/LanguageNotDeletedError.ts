class LanguageNotDeletedError extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'LanguageNotDeletedError';
	}
}

export default LanguageNotDeletedError;
