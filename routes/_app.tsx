import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>JC_2024_TeamF</title>
        <link rel="stylesheet" type="text/css" href="/styles.css" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
