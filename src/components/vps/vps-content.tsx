import Navbar from "../nav-bar"
import Footer from "../footer"
import VPSHeader from "./vps-header"
import VPSBenefits from "./vps-benefits"
import VPSInterestCTA from "./vps-interest-cta"
import VPSPlans from "./pricing/vps-pricing"
import PlanLocation from "@/types/plan/PlanLocation"
import PlanTier from "@/types/plan/PlanTier"
import VPSPlan from "@/types/plan/vps/VPSPlan"
import FAQ from "../faq/faq"
import { getDynamicContent } from "@/services/dynamic-content"
import { MOCK_VPS_DATA } from "@/services/mock-data"

export default async function VPSContent() {
    let data = {
        locations: [] as PlanLocation[],
        tiers: [] as PlanTier[],
        plans: [] as VPSPlan[]
    }

    try {
        // const response = await api.get("/hosting/vps/plans")
        // data = response.data as {
        //     locations: PlanLocation[]
        //     tiers: PlanTier[]
        //     plans: VPSPlan[]
        // }
        data = MOCK_VPS_DATA
    } catch (error) {
        console.warn("Failed to fetch vps plans, using default values.", error)
    }

    const dynamicContent = await getDynamicContent()

    return (
        <>
            <Navbar />
            <VPSHeader />
            <VPSPlans locations={data.locations} tiers={data.tiers} plans={data.plans} />
            <VPSBenefits />
            <VPSInterestCTA />
            <FAQ category="VPS" dynamicContent={dynamicContent} />
            <Footer dynamicContent={dynamicContent} />
        </>
    )
}