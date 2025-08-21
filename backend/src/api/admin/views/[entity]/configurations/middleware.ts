import { 
  MedusaRequest, 
  MedusaResponse, 
  MedusaNextFunction 
} from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import ViewConfigurationsFeatureFlag from "../../../../../loaders/feature-flags/view-configurations"

export const ensureViewConfigurationsEnabled = async (
  req: MedusaRequest,
  res: MedusaResponse,
  next: MedusaNextFunction
) => {
  const flagRouter = req.scope.resolve(
    ContainerRegistrationKeys.FEATURE_FLAG_ROUTER
  ) as any
  
  if (!flagRouter.isFeatureEnabled(ViewConfigurationsFeatureFlag.key)) {
    res.status(404).json({
      type: "not_found",
      message: "Route not found"
    })
    return
  }
  
  next()
}