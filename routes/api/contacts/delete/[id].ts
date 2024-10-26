import { Handlers } from "$fresh/server.ts";
import { Contact } from "../../../../utils/Contact.ts";

export const handler: Handlers<Contact | null> = {
    async GET(_req, ctx) {
        const kv = await Deno.openKv("db");
        const id = ctx.params.id;
        const key = ["contacts", id];
        const _res = await kv.delete(key);
        console.log("delete API called by", id);
        return new Response();
    },
};
