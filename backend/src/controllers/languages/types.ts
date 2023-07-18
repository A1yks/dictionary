export interface AddLanguageReq {
    langName: string;
}

export interface DeleteLanguageReq {
    dictId: string;
}

export interface EditLanguageNameReq {
    dictId: string;
    langName: string;
}
