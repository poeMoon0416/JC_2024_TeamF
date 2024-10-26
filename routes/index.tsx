import { Handlers, PageProps } from "$fresh/server.ts";
import LoginForm from "../components/LoginForm.tsx";

export const handler: Handlers = {
  GET(req, ctx) {
    if (req.headers.get("Cookie")) {
      return new Response(null, {
        // <リダイレクト動作確認結果>
        // 307 Temporary Redirect: 飛び先毎回変化(再計算)
        // 308 Permanent Redirect: 飛び先固定化(キャッシュ)
        // 307だとPOSTのまま飛ばすので302にしてGETに変換してリダイレクト。
        status: 302,
        statusText: "Temporary Redirect",
        headers: {
          "Location": "/login/portal",
        },
      });
    } else {
      return ctx.render({ id: "", password: "", hasError: false });
    }
  },
  async POST(req, ctx) {
    // サーバーサイドの検証ではCookieとRedirect
    const formData = await req.formData();
    const id = formData.get("id");
    const password = formData.get("password");

    // 接続自体に失敗したらcatch, ユーザーなしはthen
    const response = (await fetch(`${req.url}api/users/${id}`)).json();
    const successLogin = await response.then((user) =>
      password === user?.password
    ).catch((_e) => false);
    if (successLogin) {
      return new Response(null, {
        // <リダイレクト動作確認結果>
        // 307 Temporary Redirect: 飛び先毎回変化(再計算)
        // 308 Permanent Redirect: 飛び先固定化(キャッシュ)
        // 307だとPOSTのまま飛ばすので302にしてGETに変換してリダイレクト。
        status: 302,
        statusText: "Temporary Redirect",
        headers: {
          "Location": "/login/portal",
          "Set-Cookie": `user=${id}; Path=/;`,
        },
      });
    } else {
      return ctx.render({ id, password, hasError: true });
    }
  },
};

export default function LoginPage({ data }: PageProps) {
  return (
    <>
      <head>
        <title>ログイン</title>
        <link
          rel="stylesheet"
          type="text/css"
          href="/index.css"
        />
      </head>
      <LoginForm
        id={data.id}
        password={data.password}
        hasError={data.hasError}
      />
    </>
  );
}
