// 問い合わせ情報

export interface Contact {
    id: string; // UUID
    inquiryType: string;
    contactDate: string;
    contactDetails: string;
    constructionNumber: number;
    department: string;
    responsiblePerson: string;
    constructionDetails: string;
    clientId: string; // FK, UUID
}
