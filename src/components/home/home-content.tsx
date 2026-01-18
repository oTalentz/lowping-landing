import Navbar from "../nav-bar"
import HeaderHome from "./header/home-header"
import ChooseGameHome from "./home-featured-games"
import HomeFAQ from "./home-faq"
import Footer from "../footer"
import ReviewsHome from "./home-reviews"
import VPSInterestCTA from "../vps/vps-interest-cta"
import { getDynamicContent } from "@/services/dynamic-content"

export default async function HomeContent() {
    const dynamicContent = await getDynamicContent()

    return (
        <>
            <Navbar />
            <HeaderHome />
            <ChooseGameHome />
            <VPSInterestCTA />
            <ReviewsHome />
            <HomeFAQ dynamicContent={dynamicContent} />
            <Footer dynamicContent={dynamicContent} />
        </>
    )
}