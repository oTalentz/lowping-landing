// Imports of packages
import { Rocket } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"

type CreateServerButtonProps = {
    className?: string
}

export default function CreateServerButton({ className }: CreateServerButtonProps) {
    const t = useTranslations("navbar.create_server_button")

    return (
        <Link
            href="/games"
            className={`${className} w-fit h-fit flex items-center justify-center gap-1 text-white bg-blue-500 p-2 rounded-md border-2 border-blue-300 text-lg transition duration-300 ease-in-out hover:-translate-y-0.5`}
        >
            <Rocket strokeWidth={1} />
            <h1>{t("text")}</h1>
        </Link>
    )
}