import { ReduxProvider } from "@/redux/provider";
import "./globals.css";

export const metadata = {
  title: "Lady Porn | Onlyfans Leak & Hot Nude Girls & XXX Clips",
  description:
    "Lady Porn brings you hot Porn girls, sexy women and hardcore XXX porn & Onlyfans Leak. Watch explicit  porn video content and erotic galleries on LadiesNude.com.",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <ReduxProvider>
        <body>{children}</body>
      </ReduxProvider>
    </html>
  );
}
