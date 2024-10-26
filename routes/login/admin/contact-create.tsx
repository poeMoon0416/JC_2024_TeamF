import { Handlers, PageProps } from "$fresh/server.ts";
import ContactCreateForm from "../../../components/ContactCreateForm.tsx";

export const handler: Handlers = {
    GET(_req, ctx) {
        return ctx.render({
            inquiryType: "",
            contactDate: String(new Date()),
            contactDetails: "",
            constructionNumber: 0,
            department: "",
            responsiblePerson: "",
            constructionDetails: "",
            clientId: "",
            hasError: false,
            isPost: false,
        });
    },
    async POST(req, ctx) {
        // サーバーサイドの検証ではCookieとRedirect
        // console.log("route post");
        const formData = await req.formData();
        const id = crypto.randomUUID();
        // console.log(id);
        const inquiryType = formData.get("inquiryType");
        const contactDate = formData.get("contactDate");
        const contactDetails = formData.get("contactDetails");
        const constructionNumber = formData.get("constructionNumber");
        const department = formData.get("department");
        const responsiblePerson = formData.get("responsiblePerson");
        const constructionDetails = formData.get("constructionDetails");
        const clientId = formData.get("clientId");

        // 接続自体に失敗したらcatch, 問い合わせ情報なしはthen
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
        const hasError = await (response.then((_client) => false)
            .catch((_e) => true));
        console.log(hasError);
        return hasError
            ? ctx.render({
                id,
                inquiryType,
                contactDate,
                contactDetails,
                constructionNumber,
                department,
                responsiblePerson,
                constructionDetails,
                clientId,
                hasError,
                isPost: true,
            })
            : ctx.render({
                inquiryType: "",
                contactDate: String(new Date()),
                contactDetails: "",
                constructionNumber: 0,
                department: "",
                responsiblePerson: "",
                constructionDetails: "",
                clientId: "",
                hasError,
                isPost: true,
            });
    },
};

export default function ContactCreatePage({ data }: PageProps) {
    return (
        <>
            <ContactCreateForm
                inquiryType={data.inquiryType}
                contactDate={data.contactDate}
                contactDetails={data.contactDetails}
                constructionNumber={data.constructionNumber}
                department={data.department}
                responsiblePerson={data.responsiblePerson}
                constructionDetails={data.constructionDetails}
                clientId={data.clientId}
                hasError={data.hasError}
                isPost={data.isPost}
            />
        </>
    );
}
