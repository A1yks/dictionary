export interface AddLanguageReq {
    langName: string;
}

export interface DeleteLanguageReq {
    langId: string;
}

export interface EditLanguageNameReq {
    langId: string;
    langName: string;
}
