import { Handlers } from "$fresh/server.ts";
import { Client } from "../../../../utils/Client.ts";

export const handler: Handlers<Client | null> = {
    async GET(_req, ctx) {
        const kv = await Deno.openKv("db");
        const id = ctx.params.id;
        const key = ["clients", id];
        const _res = await kv.delete(key);
        console.log("delete API called by", id);
        return new Response();
    },
};
