class LanguageNotFoundError extends Error {
	constructor(msg?: string) {
		super(msg);
		this.name = 'LanguageNotFoundError';
	}
}

export default LanguageNotFoundError;
