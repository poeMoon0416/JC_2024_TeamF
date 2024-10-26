export default function ForgotPasswordPage() {
  return (
    <>
      <head>
        <title>パスワードリセット</title>
        <link
          rel="stylesheet"
          type="text/css"
          href="/forgot-password.css"
        />
      </head>
      <div class="reset-box">
        <h2>パスワードリセット</h2>
        <form action="/reset-password" method="post">
          <input
            type="email"
            name="email"
            placeholder="登録したメールアドレス"
            required
          />
          <br />
          <input type="submit" value="メールを送信" />
        </form>
      </div>
    </>
  );
}
