// Imports of packages
import { Server, Shield } from "lucide-react"
import Image from "next/image"
import { getTranslations } from "next-intl/server"

// Import of the project
import UserUsingVPS from "../../../../public/images/vps/user-using-vps.png"
import VPSInfoFeatures from "./vps-info-features"

export default async function VPSInfo() {
  const t = await getTranslations("vps.info")

  return (
    <div className="w-full px-4 md:px-16 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">{t("title")}</h1>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-3xl text-white font-bold mb-6">
              {t("control_section.title")}
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              {t("control_section.description")}
            </p>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-blue-600/20 p-2 rounded-lg mt-1">
                  <Server className="text-blue-500" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-medium">{t("control_section.features.dedicated_resources.title")}</h3>
                  <p className="text-gray-400">{t("control_section.features.dedicated_resources.description")}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-blue-600/20 p-2 rounded-lg mt-1">
                  <Shield className="text-blue-500" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-medium">{t("control_section.features.advanced_security.title")}</h3>
                  <p className="text-gray-400">{t("control_section.features.advanced_security.description")}</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="flex justify-center">
            <Image
              src={UserUsingVPS}
              alt="User using VPS"
              width={500}
              height={500}
              className="drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"
            />
          </div>
        </div>

        <VPSInfoFeatures />
      </div>
    </div>
  )
}