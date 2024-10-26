import { FreshContext } from "$fresh/server.ts";

export function handler(
    req: Request,
    ctx: FreshContext,
) {
    const cookie = req.headers.get("Cookie")?.split("=");
    if (cookie) {
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
