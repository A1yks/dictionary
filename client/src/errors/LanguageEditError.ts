class LanguageEditError extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'LanguageEditError';
	}
}

export default LanguageEditError;
