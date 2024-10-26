import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
    async GET(req, ctx) {
        const id = req.headers.get("Cookie")?.split("=")[1];
        const response =
            (await fetch(`${new URL(req.url).origin}/api/users/${id}`)).json();
        const isAdmin = await response.then((user) => user.isAdmin).catch(
            (_e) => false,
        );
        return ctx.render({ isAdmin });
    },
    POST(_req, _ctx) {
        return new Response(null, {
            // <リダイレクト動作確認結果>
            // 307 Temporary Redirect: 飛び先毎回変化(再計算)
            // 308 Permanent Redirect: 飛び先固定化(キャッシュ)
            // 307だとPOSTのまま飛ばすので302にしてGETに変換してリダイレクト。
            status: 302,
            statusText: "Temporary Redirect",
            headers: {
                "Location": "/",
                // PathとDomainが異なると別のCookieとして認識されるので注意。
                "Set-Cookie": "user=; Path=/; Max-Age=0;",
            },
        });
    },
};

export default function PortalPage({ data }: PageProps) {
    return (
        <>
            <head>
                <title>ポータル</title>
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="/portal.css"
                />
            </head>
            <div class="login-box" id="portal-size">
                <a href="./client-search">顧客情報検索・表示</a>
                <br></br>
                {data.isAdmin && (
                    <>
                        <a href="./admin/client-create">顧客情報作成</a>
                        <br></br>
                    </>
                )}
                <a href="./contact-search">問い合わせ情報検索・表示</a>
                <br></br>
                {data.isAdmin && (
                    <>
                        <a href="./admin/contact-create">問い合わせ情報作成</a>
                        <br></br>
                    </>
                )}

                <form id="logoutForm" action="/login/portal" method="POST">
                    <input type="submit" value="ログアウト" />
                </form>
            </div>
        </>
    );
}
