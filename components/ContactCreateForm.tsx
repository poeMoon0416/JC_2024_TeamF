interface ContactCreateFormProps {
    inquiryType: string;
    contactDate: string;
    contactDetails: string;
    constructionNumber: number;
    department: string;
    responsiblePerson: string;
    constructionDetails: string;
    clientId: string;
    hasError: boolean;
    isPost: boolean;
}

export default function ContactCreateForm(
    {
        inquiryType,
        contactDate,
        contactDetails,
        constructionNumber,
        department,
        responsiblePerson,
        constructionDetails,
        clientId,
        hasError,
        isPost,
    }: ContactCreateFormProps,
) {
    return (
        <>
            <head>
                <title>問い合わせ情報 登録</title>
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="/contact-create.css"
                />
            </head>

            <div className="contact-form-container">
                <h2>問い合わせ情報登録</h2>
                <form
                    id="contactCreateForm"
                    action="/login/admin/contact-create"
                    method="POST"
                >
                    <div className="section">
                        <h3>問い合わせ情報</h3>

                        {isPost && (
                            <p
                                class={hasError
                                    ? "text-red-500"
                                    : "text-green-500"}
                            >
                                {hasError
                                    ? "使用できない文字が含まれています。"
                                    : "正常に登録できました。"}
                            </p>
                        )}

                        <div className="form-group">
                            <fieldset>
                                <label>
                                    <input
                                        type="radio"
                                        name="inquiryType"
                                        value="isRequest"
                                        checked={inquiryType === "isRequest"}
                                    />{" "}
                                    依頼
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="inquiryType"
                                        value="isContact"
                                        checked={inquiryType === "isContact"}
                                    />{" "}
                                    問い合わせ
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="inquiryType"
                                        value="isSupport"
                                        checked={inquiryType === "isSupport"}
                                    />{" "}
                                    サポート
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="inquiryType"
                                        value="isClaim"
                                        checked={inquiryType === "isClaim"}
                                    />{" "}
                                    クレーム
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="inquiryType"
                                        value="isEtc"
                                        checked={inquiryType === "isEtc"}
                                    />{" "}
                                    その他
                                </label>
                            </fieldset>
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">日付:</label>
                            <input
                                id="name"
                                type="date"
                                name="contactDate"
                                value={contactDate}
                                placeholder="日付"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">内容:</label>
                            <input
                                id="name"
                                type="text"
                                name="contactDetails"
                                value={contactDetails}
                                placeholder="内容"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">施工番号:</label>
                            <input
                                id="name"
                                type="number"
                                name="constructionNumber"
                                value={constructionNumber}
                                placeholder="施工番号"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">部署名:</label>
                            <input
                                id="name"
                                type="text"
                                name="department"
                                value={department}
                                placeholder="部署名"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">責任者:</label>
                            <input
                                id="name"
                                type="text"
                                name="responsiblePerson"
                                value={responsiblePerson}
                                placeholder="責任者"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">施工内容:</label>
                            <input
                                id="name"
                                type="text"
                                name="constructionDetails"
                                value={constructionDetails}
                                placeholder="施工内容"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">顧客ID:</label>
                            <input
                                id="name"
                                type="text"
                                name="clientId"
                                value={clientId}
                                placeholder="顧客ID"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <button type="submit">送信</button>
                    </div>
                </form>
            </div>
        </>
    );
}
