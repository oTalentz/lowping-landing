import "./globals.css"
import { getLocale, getMessages, getTranslations } from "next-intl/server"
import { PopupProvider } from "@/components/popup/popup-provider"
import { getDynamicContent } from "@/services/dynamic-content"
import { NextIntlClientProvider } from "next-intl"
import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata")

  return {
    title: {
      template: `%s | ${t("title")}`,
      default: t("title"),
    },
    description: t("description"),
    keywords: t("keywords"),
    metadataBase: new URL("https://lowping.host")
  }
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale()
  const messages = await getMessages({ locale })

  const dynamicContent = await getDynamicContent()

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <PopupProvider contents={dynamicContent}>
            {children}
          </PopupProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}