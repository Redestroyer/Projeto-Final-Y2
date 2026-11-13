import "./global.css";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body className="bg-slate-50 text-slate-700 dark:bg-gray-800 dark:text-gray-200">
        {children}
      </body>
    </html>
  )
}