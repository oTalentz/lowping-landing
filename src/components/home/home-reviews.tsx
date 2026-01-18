import Image from "next/image"
import Link from "next/link"
import { Feedback } from "@/types/Feedback"
import { Star } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { MOCK_FEEDBACK_LIST } from "@/services/mock-data"

// Rounding function to format customer counts
/*
function roundCustomerCount(count: number): number {
    if (count >= 1000) {
        return Math.ceil(count / 100) * 100 // Round to nearest hundred for 1000+
    } else if (count >= 100) {
        return Math.ceil(count / 10) * 10 // Round to nearest ten for 100-999
    } else if (count >= 10) {
        return Math.ceil(count / 5) * 5 // Round to nearest five for 10-99
    } else {
        return Math.ceil(count / 10) * 10 // Round to nearest ten for 1-9
    }
}
*/

export default async function ReviewsHome() {
    const t = await getTranslations("home.reviews")

    let data = {
        totalCount: 0,
        averageRating: 0,
        feedbacks: [] as Feedback[]
    }

    try {
        // const response = await api.get("/hosting/feedback/list", {
        //     params: {
        //         limit: 4
        //     }
        // })

        // const responseData = response.data as {
        //     totalCount?: number
        //     averageRating?: number // double (1 - 5, can be decimal like 3.7, 4.4, etc.)
        //     feedbacks: Feedback[]
        // }

        data = {
            totalCount: MOCK_FEEDBACK_LIST.totalCount ?? 0,
            averageRating: MOCK_FEEDBACK_LIST.averageRating ?? 0,
            feedbacks: MOCK_FEEDBACK_LIST.feedbacks
        }
    } catch (error) {
        console.warn("Failed to fetch reviews, using default values.", error)
    }

    // Round the customer count according to the specified pattern
    // const roundedCustomerCount = roundCustomerCount(data.totalCount || 0)

    // Format the average rating to one decimal place
    const formattedRating = (data.averageRating || 4.5).toFixed(1)

    return (
        <section className="py-20 md:py-32 w-full px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-32 max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div className="flex flex-col text-white order-2 lg:order-1">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
                        {t("title")}
                    </h2>

                    <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-200 leading-relaxed max-w-lg">
                        {t("description")}
                    </p>

                    <div className="flex flex-wrap gap-4 mt-8">
                        <Link
                            href={"/games"}
                            className="inline-flex items-center justify-center px-6 py-3 text-base sm:text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                        >
                            {t("see_plans_button.text")}
                        </Link>
                    </div>

                    <div className="mt-10 flex flex-wrap items-center gap-6">
                        <div className="flex items-center">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gradient-to-r from-blue-500 to-purple-500">
                                    <Image
                                        src="/images/customers/white.gif"
                                        width={32}
                                        height={32}
                                        quality={100}
                                        alt="Customer avatar"
                                        className="rounded-full object-cover"
                                        unoptimized
                                    />
                                </div>
                                <div className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gradient-to-r from-blue-500 to-purple-500">
                                    <Image
                                        src="/images/customers/leo.png"
                                        width={32}
                                        height={32}
                                        quality={100}
                                        alt="Customer avatar"
                                        className="rounded-full object-cover"
                                    />
                                </div>
                                <div className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gradient-to-r from-blue-500 to-purple-500">
                                    <Image
                                        src="/images/customers/nyuu.png"
                                        width={32}
                                        height={32}
                                        quality={100}
                                        alt="Customer avatar"
                                        className="rounded-full object-cover"
                                    />
                                </div>
                                <div className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gradient-to-r from-blue-500 to-purple-500">
                                    <Image
                                        src="/images/customers/sr_mk.gif"
                                        width={32}
                                        height={32}
                                        quality={100}
                                        alt="Customer avatar"
                                        className="rounded-full object-cover"
                                        unoptimized
                                    />
                                </div>
                            </div>
                            <p className="ml-3 text-sm text-gray-300">
                                <span className="font-semibold text-white">50+</span> {t("satisfied_customers")}
                            </p>
                        </div>

                        <div className="flex items-center gap-1">
                            <div className="flex">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        fill={i < Math.floor(data.averageRating || 4.5) ? "#eab308" : "none"}
                                        className={i < Math.floor(data.averageRating || 4.5) ? "text-yellow-500" : i < (data.averageRating || 4.5) ? "text-yellow-500" : "text-gray-500"}
                                    />
                                ))}
                            </div>
                            <p className="text-sm text-gray-300">
                                <span className="font-semibold text-white">{formattedRating}</span> /5 {t("average_rating")}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative py-4 bg-black rounded-lg order-1 lg:order-2 text-white">
                    <div className="w-full h-full inset-0 absolute bg-gradient-to-b from-black via-transparent to-black rounded-lg" />
                    <div className="flex justify-center">
                        <div className="flex flex-col items-center gap-3 max-w-md w-full">
                            {data.feedbacks.slice(0, 4).map((feedback) => (
                                <div
                                    key={feedback.id}
                                    className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 hover:border-blue-500/50 transition-all duration-300 hover:shadow-md hover:shadow-blue-500/10 w-full"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="relative">
                                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-sm opacity-70" />
                                            <Image
                                                src={feedback.customerAvatarURL || "/placeholder.svg"}
                                                width={40}
                                                height={40}
                                                alt={`Avatar de ${feedback.customerName}`}
                                                className="rounded-full relative border-2 border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium">{feedback.customerName}</p>
                                            <span className="flex gap-1 text-yellow-500">
                                                {Array.from({ length: feedback.stars }, (_, index) => (
                                                    <Star key={index} size={12} fill="#eab308" />
                                                ))}
                                                {Array.from({ length: 5 - feedback.stars }, (_, index) => (
                                                    <Star key={index} size={12} className="text-gray-500" />
                                                ))}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        {feedback.comment.length > 120 ? `${feedback.comment.substring(0, 120)}...` : feedback.comment}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
