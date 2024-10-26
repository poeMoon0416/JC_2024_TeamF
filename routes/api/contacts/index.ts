import { Handlers } from "$fresh/server.ts";
import { Contact } from "../../../utils/Contact.ts";

export const handler: Handlers<Contact | null> = {
    async POST(req, _ctx) {
        const kv = await Deno.openKv("db");
        const contact = (await req.json()) as Contact;
        const contactKey = ["contacts", contact.id];
        const ok = await kv.atomic().set(contactKey, contact).commit();
        if (!ok) throw new Error("invalid contact.");
        return new Response(JSON.stringify(contact));
    },
};
