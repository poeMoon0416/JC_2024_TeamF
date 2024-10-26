interface ClientCreateFormProps {
    lastNameHiragana: string;
    firstNameHiragana: string;
    lastName: string;
    firstName: string;
    tel: string;
    birthday: Date;
    address: string;
    hasError: boolean;
    isPost: boolean;
}

export default function ClientCreateForm(
    {
        lastNameHiragana,
        firstNameHiragana,
        lastName,
        firstName,
        tel,
        birthday,
        address,
        hasError,
        isPost,
    }: ClientCreateFormProps,
) {
    return (
        <>
            <head>
                <title>顧客情報 登録</title>
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="/client-create.css"
                />
            </head>

            <div className="contact-form-container">
                <h2>情報登録</h2>
                <form
                    id="clientCreateForm"
                    action="/login/admin/client-create"
                    method="POST"
                >
                    <div className="section">
                        <h3>顧客情報</h3>

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
                            <label htmlFor="name">苗字(かな):</label>
                            <input
                                id="name"
                                type="text"
                                name="lastNameHiragana"
                                value={lastNameHiragana}
                                placeholder="苗字(かな)"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">名前(かな):</label>
                            <input
                                id="name"
                                type="text"
                                name="firstNameHiragana"
                                value={firstNameHiragana}
                                placeholder="名前(かな)"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">苗字:</label>
                            <input
                                id="name"
                                type="text"
                                name="lastName"
                                value={lastName}
                                placeholder="苗字"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">名前:</label>
                            <input
                                id="name"
                                type="text"
                                name="firstName"
                                value={firstName}
                                placeholder="名前"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">電話番号:</label>
                            <input
                                id="phone"
                                type="tel"
                                name="tel"
                                value={tel}
                                placeholder="電話番号"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">誕生日:</label>
                            <input
                                id="address"
                                type="date"
                                name="birthday"
                                value={String(birthday)}
                                placeholder="誕生日"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">住所:</label>
                            <input
                                id="address"
                                type="text"
                                name="address"
                                value={address}
                                placeholder="住所"
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
