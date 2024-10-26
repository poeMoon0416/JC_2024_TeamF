import { Handlers } from "$fresh/server.ts";
import { Client } from "../../../utils/Client.ts";

export const handler: Handlers<Client | null> = {
    async POST(req, _ctx) {
        console.log("API post");
        const kv = await Deno.openKv("db");
        const client = (await req.json()) as Client;
        const clientKey = ["clients", client.id];
        const ok = await kv.atomic().set(clientKey, client).commit();
        console.log(ok);
        if (!ok) throw new Error("invalid client.");
        return new Response(JSON.stringify(client));
    },
};
