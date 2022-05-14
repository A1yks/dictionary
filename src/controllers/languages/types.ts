export interface AddLanguageReq {
    languageName: string;
}

export interface DeleteLanguageReq {
    langId: string;
}

export interface EditLanguageNameReq {
    langId: string;
    languageName: string;
}
