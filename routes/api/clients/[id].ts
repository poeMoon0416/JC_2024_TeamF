import { Handlers } from "$fresh/server.ts";
import { Client } from "../../../utils/Client.ts";

export const handler: Handlers<Client | null> = {
    async GET(_req, ctx) {
        const kv = await Deno.openKv("db");
        const id = ctx.params.id;
        const key = ["clients", id];
        const client = (await kv.get<Client>(key)).value!;
        console.log(id, client)
        return new Response(JSON.stringify(client));
    },
};
