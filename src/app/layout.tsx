import type { Metadata } from "next";
import { Poppins,Montserrat,Roboto,Inter,Lato,Ubuntu } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["300","400","500","600"],
// })

// const mont = Montserrat({
//   subsets: ["latin"],
//   weight: ["300","400","500","600","700"],
// })

// const robo = Roboto({
//   subsets: ["latin"],
//   weight: ["300","400","500"],
// })

export const ubu = Ubuntu({
  subsets: ["latin"],
  weight: ["300","400","700"],
})

const lato = Lato({
  subsets: ["latin"],
  weight: ["100","300","400","700"],
})



export const metadata: Metadata = {
  title: "CheckBook.com",
  description: "know the time to book or cancel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lato.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
