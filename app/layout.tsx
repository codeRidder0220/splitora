import "./globals.css";
import NavbarServer from "@/components/NavbarServer";

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>)
 {
  return (
    <html lang="en">
      <body>
        <NavbarServer />
        {children}
      </body>
    </html>
  );
}