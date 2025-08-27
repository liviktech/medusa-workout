import { Router } from "express"
import cors from "cors"
import { projectConfig } from "../../medusa-config"

export default () => {
  const router = Router()

  router.use(cors({
    origin: projectConfig.http.adminCors.split(","),
    credentials: true,
  }))

  router.get("/admin/hello", (req, res) => {
    res.json({
      message: "Welcome to Your Store!",
    })
  })

  router.get("/admin/bye", (req, res) => {
    res.json({
      message: "Bye from Your Store!",
    })
  })

  router.get("/admin/products/count", (req, res) => {
    const productService = req.scope.resolve("productService")

    productService.count().then((count) => {
      res.json({
        count,
      })
    })
  })


  return router
}