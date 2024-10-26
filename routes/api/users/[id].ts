import { Handlers } from "$fresh/server.ts";
import { User } from "../../../utils/User.ts";

export const handler: Handlers<User | null> = {
    async GET(_req, ctx) {
        const kv = await Deno.openKv("db");
        const id = ctx.params.id;
        const key = ["users", id];
        const user = (await kv.get<User>(key)).value!;
        return new Response(JSON.stringify(user));
    },
};
