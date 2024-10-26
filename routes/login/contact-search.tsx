import { Handlers, PageProps } from "$fresh/server.ts";
import { Contact } from "../../utils/Contact.ts";
import ContactEditDeleteForm from "../../islands/ContactEditDeleteForm.tsx";

export const handler: Handlers = {
    GET(_req, ctx) {
        console.log("GET");
        return ctx.render({
            clientId: "",
            inquiryType: "",
            contacts: [],
            hasError: false,
            isPost: false,
        });
    },
    async POST(req, ctx) {
        // サーバーサイドの検証ではCookieとRedirect
        const formData = await req.formData();
        const inquiryType = String(formData.get("inquiryType"));
        const clientId = String(formData.get("clientId"));
        let contacts: Contact[] = [];
        const method = String(formData.get("method"));
        console.log(method);

        // 更新
        if (method === "PUT") {
            const id = String(formData.get("id"));
            const contactDate = String(formData.get("contactDate"));
            const contactDetails = String(formData.get("contactDetails"));
            const constructionNumber = Number(
                formData.get("constructionNumber"),
            );
            const department = String(formData.get("department"));
            const responsiblePerson = String(formData.get("responsiblePerson"));
            const constructionDetails = String(
                formData.get("constructionDetails"),
            );

            const response = (await fetch(
                `${new URL(req.url).origin}/api/contacts`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        id,
                        inquiryType,
                        contactDate,
                        contactDetails,
                        constructionNumber,
                        department,
                        responsiblePerson,
                        constructionDetails,
                        clientId,
                    }),
                },
            )).json();
            const hasError = await (response.then((_contact) => false)
                .catch((_e) => true));
            console.log(hasError);
            return hasError
                ? ctx.render({
                    clientId,
                    inquiryType,
                    contacts,
                    hasError,
                    isPost: true,
                })
                : ctx.render({
                    clientId: "",
                    inquiryType: "",
                    contacts,
                    hasError,
                    isPost: true,
                });
        }

        // 削除
        if (method === "DELETE") {
            const id = String(formData.get("id"));

            const response = await fetch(
                `${new URL(req.url).origin}/api/contacts/delete/${id}`,
            );
            const hasError = response ? false : true;
            console.log(hasError);
            return hasError
                ? ctx.render({
                    clientId,
                    inquiryType,
                    contacts,
                    hasError,
                    isPost: true,
                })
                : ctx.render({
                    clientId: "",
                    inquiryType: "",
                    contacts,
                    hasError,
                    isPost: true,
                });
        }

        // 検索
        // 接続自体に失敗したらcatch, 顧客情報なしはthen
        const response = (await fetch(
            `${new URL(req.url).origin}/api/contacts/list`,
        )).json();
        const hasError = await (response.then((newContacts) => {
            contacts = newContacts;
            // console.log(newContacts);
            // console.log("clientId", clientId === "" ? ".*" : clientId, "inquiryType", inquiryType === "null" ? ".*" : inquiryType);
            contacts = contacts.filter((contact) =>
                new RegExp(clientId === "" ? ".*" : clientId).test(
                    contact.clientId,
                )
            );
            contacts = contacts.filter((contact) =>
                new RegExp(inquiryType === "null" ? ".*" : inquiryType).test(
                    contact.inquiryType,
                )
            );
            return false;
        }).catch((_e) => true));
        // console.log(hasError);
        return hasError
            ? ctx.render({
                clientId,
                inquiryType,
                contacts,
                hasError,
                isPost: true,
            })
            : ctx.render({
                clientId: "",
                inquiryType: "",
                contacts,
                hasError,
                isPost: true,
            });
    },
};

export default function ContactSearchPage({ data }: PageProps) {
    const contacts: Contact[] = data.contacts;
    const hasError: boolean = data.hasError;
    const isPost: boolean = data.isPost;

    return (
        <>
            {/* Helmetを使用して<meta>や<title>を設定するのが一般的 */}
            {/* Helmetはインストールが必要: npm install react-helmet */}
            {/* import { Helmet } from 'react-helmet'; */}
            <head>
                <title>問い合わせ情報 検索</title>
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="/contact-search.css"
                />
            </head>

            <div class="flex flex-col">
                <div className="contact-form-container">
                    <h2>問い合わせ情報 検索</h2>
                    <form action="/login/contact-search" method="POST">
                        <input
                            type="hidden"
                            name="method"
                            value="POST"
                        />
                        <div className="section">
                            <h3>問い合わせ情報 検索</h3>
                            {data.isPost && (
                                <p
                                    class={data.hasError
                                        ? "text-red-500"
                                        : "text-green-500"}
                                >
                                    {data.hasError
                                        ? "使用できない文字が含まれています。"
                                        : "正常に検索できました。"}
                                </p>
                            )}
                            <div className="form-group">
                                <label htmlFor="customer-id">顧客ID:</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="clientId"
                                    value={data.clientId}
                                    placeholder="顧客ID"
                                />
                            </div>
                        </div>
                        {/* 問い合わせタイプ */}
                        <div className="section">
                            <h3>問い合わせタイプ</h3>
                            <div className="form-group">
                                <fieldset>
                                    <label>
                                        <input
                                            type="radio"
                                            name="inquiryType"
                                            value="isRequest"
                                            checked={data.inquiryType ===
                                                "isRequest"}
                                        />{" "}
                                        依頼
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="inquiryType"
                                            value="isContact"
                                            checked={data.inquiryType ===
                                                "isContact"}
                                        />{" "}
                                        問い合わせ
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="inquiryType"
                                            value="isSupport"
                                            checked={data.inquiryType ===
                                                "isSupport"}
                                        />{" "}
                                        サポート
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="inquiryType"
                                            value="isClaim"
                                            checked={data.inquiryType ===
                                                "isClaim"}
                                        />{" "}
                                        クレーム
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="inquiryType"
                                            value="isEtc"
                                            checked={data.inquiryType ===
                                                "isEtc"}
                                        />{" "}
                                        その他
                                    </label>
                                </fieldset>
                            </div>
                        </div>

                        {/* 送信ボタン */}
                        <div className="form-group">
                            <button type="submit">送信</button>
                        </div>
                    </form>
                </div>
                <ContactEditDeleteForm
                    contacts={contacts}
                    hasError={hasError}
                    isPost={isPost}
                />
            </div>
        </>
    );
}
