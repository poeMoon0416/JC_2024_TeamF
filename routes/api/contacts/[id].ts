import { Handlers } from "$fresh/server.ts";
import { Contact } from "../../../utils/Contact.ts";

export const handler: Handlers<Contact | null> = {
    async GET(_req, ctx) {
        const kv = await Deno.openKv("db");
        const id = ctx.params.id;
        const key = ["contacts", id];
        const contact = (await kv.get<Contact>(key)).value!;
        return new Response(JSON.stringify(contact));
    },
};
