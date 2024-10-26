import { Handlers, PageProps } from "$fresh/server.ts";
import ClientEditDeleteForm from "../../islands/ClientEditDeleteForm.tsx";
import { Client } from "./../../utils/Client.ts";

export const handler: Handlers = {
    GET(_req, ctx) {
        console.log("GET");
        return ctx.render({
            lastNameHiragana: "",
            firstNameHiragana: "",
            tel: "",
            birthday: "",
            clients: [],
            hasError: false,
            isPost: false,
        });
    },
    async POST(req, ctx) {
        // サーバーサイドの検証ではCookieとRedirect
        const formData = await req.formData();
        const lastNameHiragana = String(formData.get("lastNameHiragana"));
        const firstNameHiragana = String(formData.get("firstNameHiragana"));
        const tel = String(formData.get("tel"));
        const birthday = String(formData.get("birthday"));
        let clients: Client[] = [];
        const method = String(formData.get("method"));
        console.log(method);

        // 更新
        if (method === "PUT") {
            // console.log(lastNameHiragana);
            const id = String(formData.get("id"));
            const lastName = String(formData.get("lastName"));
            const firstName = String(formData.get("firstName"));
            const address = String(formData.get("address"));

            const response = (await fetch(
                `${new URL(req.url).origin}/api/clients`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        id,
                        lastNameHiragana,
                        firstNameHiragana,
                        lastName,
                        firstName,
                        tel,
                        birthday,
                        address,
                    }),
                },
            )).json();
            const hasError = await (response.then((_client) => false)
                .catch((_e) => true));
            console.log(hasError);
            return hasError
                ? ctx.render({
                    lastNameHiragana,
                    firstNameHiragana,
                    tel,
                    birthday,
                    clients,
                    hasError,
                    isPost: true,
                })
                : ctx.render({
                    lastName: "",
                    firstName: "",
                    tel: "",
                    birthday: "",
                    clients,
                    hasError,
                    isPost: true,
                });
        }

        // 削除
        if (method === "DELETE") {
            console.log("DELETE");
            const id = String(formData.get("id"));

            const response = await fetch(
                `${new URL(req.url).origin}/api/clients/delete/${id}`,
            );
            const hasError = response ? false : true;
            console.log(hasError);
            return hasError
                ? ctx.render({
                    lastNameHiragana,
                    firstNameHiragana,
                    tel,
                    birthday,
                    clients,
                    hasError,
                    isPost: true,
                })
                : ctx.render({
                    lastName: "",
                    firstName: "",
                    tel: "",
                    birthday: "",
                    clients,
                    hasError,
                    isPost: true,
                });
        }

        // 検索
        // 接続自体に失敗したらcatch, 顧客情報なしはthen
        const response = (await fetch(
            `${new URL(req.url).origin}/api/clients/list`,
        )).json();
        const hasError = await (response.then((newClients) => {
            clients = newClients;
            clients = clients.filter((client) =>
                new RegExp(
                    lastNameHiragana === "" ? ".*" : lastNameHiragana,
                )
                    .test(
                        client.lastNameHiragana,
                    )
            );
            clients = clients.filter((client) =>
                new RegExp(
                    firstNameHiragana === "" ? ".*" : firstNameHiragana,
                )
                    .test(
                        client.firstNameHiragana,
                    )
            );
            clients = clients.filter((client) =>
                new RegExp(tel === "" ? ".*" : tel)
                    .test(
                        client.tel,
                    )
            );
            clients = clients.filter((client) =>
                new RegExp(birthday === "" ? ".*" : birthday)
                    .test(
                        String(client.birthday),
                    )
            );
            // console.log(clients);
            return false;
        }).catch((_e) => true));
        // console.log(hasError);
        return hasError
            ? ctx.render({
                lastNameHiragana,
                firstNameHiragana,
                tel,
                birthday,
                clients,
                hasError,
                isPost: true,
            })
            : ctx.render({
                lastName: "",
                firstName: "",
                tel: "",
                birthday: "",
                clients,
                hasError,
                isPost: true,
            });
    },
};

export default function ClientSearchPage({ data }: PageProps) {
    const clients: Client[] = data.clients;
    const hasError: boolean = data.hasError;
    const isPost: boolean = data.isPost;

    return (
        <>
            <head>
                <title>顧客情報 検索</title>
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="/client-search.css"
                />
            </head>
            <div class="flex flex-col">
                <div className="client-form-container">
                    <h2>顧客情報 検索</h2>
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
                    <form
                        id="clientSearchForm"
                        action="/login/client-search"
                        method="POST"
                    >
                        <div className="section">
                            <div className="form-group">
                                <input
                                    type="hidden"
                                    name="method"
                                    value="POST"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">苗字(かな):</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="lastNameHiragana"
                                    placeholder="苗字(かな)を入力"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">名前(かな):</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="firstNameHiragana"
                                    placeholder="名前(かな)を入力"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">電話番号:</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="tel"
                                    placeholder="電話番号を入力"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="birthday">誕生日:</label>
                                <input
                                    type="date"
                                    id="birthday"
                                    name="birthday"
                                />
                            </div>
                        </div>

                        {/* 送信ボタン */}
                        <div className="form-group">
                            <button type="submit" id="method" value="search">
                                送信
                            </button>
                        </div>
                    </form>
                </div>
                <ClientEditDeleteForm
                    clients={clients}
                    hasError={hasError}
                    isPost={isPost}
                />
            </div>
        </>
    );
}
