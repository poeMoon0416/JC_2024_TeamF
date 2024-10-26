import { Handlers } from "$fresh/server.ts";
import { User } from "../../../utils/User.ts";

export const handler: Handlers<User | null> = {
    async POST(req, _ctx) {
        const kv = await Deno.openKv("db");
        const user = (await req.json()) as User;
        const userKey = ["users", user.id];
        const ok = await kv.atomic().set(userKey, user).commit();
        if (!ok) throw new Error("invalid user.");
        return new Response(JSON.stringify(user));
    },
};
