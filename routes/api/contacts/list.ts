import { Handlers } from "$fresh/server.ts";
import { Contact } from "../../../utils/Contact.ts";

export const handler: Handlers<Contact | null> = {
    async GET(_req, _ctx) {
        const kv = await Deno.openKv("db");
        const entries = await kv.list<Contact>({ prefix: ["contacts"] });
        const contacts: Contact[] = [];
        for await (const entry of entries) {
            contacts.push(entry.value);
        }
        // console.log("contacts-list", contacts);
        return new Response(JSON.stringify(contacts));
    },
};
