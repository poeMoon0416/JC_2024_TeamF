import { Handlers, PageProps } from "$fresh/server.ts";
import ClientCreateForm from "../../../components/ClientCreateForm.tsx";

export const handler: Handlers = {
    GET(_req, ctx) {
        return ctx.render({
            lastNameHiragana: "",
            firstNameHiragana: "",
            lastName: "",
            firstName: "",
            tel: "",
            birthday: "",
            address: "",
            hasError: false,
            isPost: false,
        });
    },
    async POST(req, ctx) {
        // サーバーサイドの検証ではCookieとRedirect
        console.log("route post");
        const formData = await req.formData();
        const id = crypto.randomUUID();
        console.log(id);
        const lastNameHiragana = formData.get("lastNameHiragana");
        const firstNameHiragana = formData.get("firstNameHiragana");
        const lastName = formData.get("lastName");
        const firstName = formData.get("firstName");
        const tel = formData.get("tel");
        const birthday = formData.get("birthday");
        const address = formData.get("address");

        // 接続自体に失敗したらcatch, 顧客情報なしはthen
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
                lastName,
                firstName,
                tel,
                birthday,
                address,
                hasError,
                isPost: true,
            })
            : ctx.render({
                lastNameHiragana: "",
                firstNameHiragana: "",
                lastName: "",
                firstName: "",
                tel: "",
                birthday: "",
                clientId: "",
                address: "",
                hasError,
                isPost: true,
            });
    },
};

export default function ClientCreatePage({ data }: PageProps) {
    return (
        <>
            <ClientCreateForm
                lastNameHiragana={data.lastNameHiragana}
                firstNameHiragana={data.firstNameHiragana}
                lastName={data.lastName}
                firstName={data.firstName}
                tel={data.tel}
                birthday={data.birthday}
                address={data.address}
                hasError={data.hasError}
                isPost={data.isPost}
            />
        </>
    );
}
