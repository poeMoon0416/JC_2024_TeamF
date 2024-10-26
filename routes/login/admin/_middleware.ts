import { FreshContext } from "$fresh/server.ts";

export async function handler(
    req: Request,
    ctx: FreshContext,
) {
    const id = req.headers.get("Cookie")?.split("=")[1];
    const response = (await fetch(`${new URL(req.url).origin}/api/users/${id}`))
        .json();
    const isAdmin = await response.then((user) => user.isAdmin).catch(
        (_e) => false,
    );
    if (isAdmin) {
        return ctx.next();
    } else {
        return new Response(null, {
            // <リダイレクト動作確認結果>
            // 307 Temporary Redirect: 飛び先毎回変化(再計算)
            // 308 Permanent Redirect: 飛び先固定化(キャッシュ)
            // 307だとPOSTのまま飛ばすので302にしてGETに変換してリダイレクト。
            status: 302,
            statusText: "Temporary Redirect",
            headers: {
                "Location": "/",
            },
        });
    }
}
