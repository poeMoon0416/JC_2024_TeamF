interface LoginFormProps {
  id: string;
  password: string;
  hasError: boolean;
}

export default function LoginForm({ id, password, hasError }: LoginFormProps) {
  return (
    <>
      <head>
        <title>ログイン</title>
        <link rel="stylesheet" type="text/css" href="/index.css" />
      </head>
      <div class="login-box">
        <h2>ログイン</h2>
        <form
          id="loginForm"
          action="/"
          method="POST"
        >
          {hasError && (
            <p class="text-red-500">IDかパスワードが間違っています。</p>
          )}
          <input
            type="text"
            name="id"
            value={id}
            placeholder="ユーザーID"
            required
          />
          <br />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="パスワード"
            required
          />
          <br />
          <input type="submit" value="ログイン" />
        </form>
        <div class="forgot-password.html">
          <a href="/forgot-password">パスワードを忘れた場合</a>
        </div>
      </div>
    </>
  );
}
