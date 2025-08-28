import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
import { syncBrandToCmsWorkflow } from "../workflows/sync-brands-to-cms";
import BrandModuleService from "../modules/brand/service";

export default async function brandCreatedHandler({
    event: { data },
    container,
}: SubscriberArgs<{ id: string }>) {
    const logger = container.resolve("logger")
    const brandModuleService: BrandModuleService = container.resolve("brandModuleService")

    let brandName = "unknown"
    try {
        const brand = await brandModuleService.retrieveBrand(data.id)
        if (brand && brand.name) {
            brandName = brand.name
        }
    } catch (err) {
        logger.warn(`brandCreatedHandler: Failed to fetch brand name for id ${data.id}. Proceeding anyway. Error: ${err}`)
    }

    logger.info(`brandCreatedHandler: Syncing brand "${brandName}" (id: ${data.id}) to CMS...`)

    await syncBrandToCmsWorkflow(container).run({
        input: data
    })

    logger.info(`brandCreatedHandler: Finished syncing brand "${brandName}" (id: ${data.id}) to CMS.`)
}

export const config: SubscriberConfig = {
    event: "brand.created"
}