import { Handlers } from "$fresh/server.ts";
import { Client } from "../../../utils/Client.ts";

export const handler: Handlers<Client | null> = {
    async GET(_req, _ctx) {
        const kv = await Deno.openKv("db");
        const entries = await kv.list<Client>({ prefix: ["clients"] });
        const clients: Client[] = [];
        for await (const entry of entries) {
            clients.push(entry.value);
        }
        // console.log("clients-list", clients);
        return new Response(JSON.stringify(clients));
    },
};
