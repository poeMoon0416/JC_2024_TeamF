import { Contact } from "./../utils/Contact.ts";

interface ContactEditDeleteFormProps {
    contacts: Contact[];
    hasError: boolean;
    isPost: boolean;
}

export default function ContactEditDeleteForm(
    {
        contacts,
        hasError,
        isPost,
    }: ContactEditDeleteFormProps,
) {
    return (
        <>
            <ul>
                <h2 class="font-bold">問い合わせ情報 検索結果</h2>
                {isPost && (
                    <p
                        class={hasError ? "text-red-500" : "text-green-500"}
                    >
                        {hasError
                            ? "更新・削除できませんでした。"
                            : "正常に更新・削除できました。"}
                    </p>
                )}
                <li class="flex flex-row flex-wrap *:p-2">
                    <p>問い合わせID</p>
                    <p>問い合わせタイプ</p>
                    <p>問い合わせ年月日</p>
                    <p>問い合わせ内容</p>
                    <p>施工番号</p>
                    <p>部署</p>
                    <p>責任者</p>
                    <p>施工内容</p>
                    <p>顧客ID</p>
                </li>
                {contacts.map((contact: Contact) => (
                    <li class="flex flex-row flex-wrap *:p-2">
                        <form
                            id="contactEditForm"
                            action="/login/contact-search"
                            method="POST"
                        >
                            <input
                                type="hidden"
                                name="method"
                                value="PUT"
                            />
                            <button type="submit">
                                更新
                            </button>
                            <form
                                id="contactDeleteForm"
                                action="/login/contact-search"
                                method="POST"
                            >
                                <button type="submit">
                                    削除
                                </button>
                                <input
                                    type="hidden"
                                    name="method"
                                    value="DELETE"
                                />
                                <input
                                    type="hidden"
                                    id="id"
                                    name="id"
                                    placeholder="idが存在しません"
                                    value={contact.id}
                                    required
                                />
                            </form>
                            <input
                                type="text"
                                id="id"
                                name="id"
                                placeholder="idが存在しません"
                                value={contact.id}
                                required
                            />
                            <input
                                type="text"
                                id="inquiryType"
                                name="inquiryType"
                                placeholder="問い合わせタイプが存在しません"
                                value={contact.inquiryType}
                                required
                            />
                            <input
                                type="date"
                                id="contactDate"
                                name="contactDate"
                                placeholder="日付が存在しません"
                                value={String(contact.contactDate)}
                                required
                            />
                            <input
                                type="text"
                                id="contactDetails"
                                name="contactDetails"
                                placeholder="内容が存在しません"
                                value={contact.contactDetails}
                                required
                            />
                            <input
                                type="number"
                                id="constructionNumber"
                                name="constructionNumber"
                                placeholder="施工番号が存在しません"
                                value={contact.constructionNumber}
                                required
                            />
                            <input
                                type="text"
                                id="department"
                                name="department"
                                placeholder="部署名が存在しません"
                                value={contact.department}
                                required
                            />
                            <input
                                type="text"
                                id="responsiblePerson"
                                name="responsiblePerson"
                                placeholder="責任者が存在しません"
                                value={contact.responsiblePerson}
                                required
                            />
                            <input
                                type="text"
                                id="constructionDetails"
                                name="constructionDetails"
                                placeholder="施工内容が存在しません"
                                value={contact.constructionDetails}
                                required
                            />
                            <input
                                type="text"
                                id="clientId"
                                name="clientId"
                                placeholder="顧客IDが存在しません"
                                value={contact.clientId}
                                required
                            />
                        </form>
                    </li>
                ))}
            </ul>
        </>
    );
}
