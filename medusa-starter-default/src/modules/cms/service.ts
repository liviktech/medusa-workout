import { Logger } from "@medusajs/medusa"
import { ConfigModule } from "@medusajs/framework"

export type ModuleOptions = {
    apiKey: string
    baseUrl?: string
}

type InjectedDependencies = {
    logger: Logger
    configModule: ConfigModule
}

class CmsModuleService {
    private options_: ModuleOptions
    private logger_: Logger
    private baseUrl_: string

    constructor({ logger }: InjectedDependencies, options: ModuleOptions) {
        this.logger_ = logger
        this.options_ = options
        this.baseUrl_ = options.baseUrl || "http://127.0.0.1:1337/api"
    }

    private async sendRequest(url: string, method: string, data?: any): Promise<any> {
        const fullUrl = `${this.baseUrl_}${url}`
        
        this.logger_.info(`Sending a ${method} request to ${fullUrl}.`)
        if (data) {
            this.logger_.info(`Request Data: ${JSON.stringify(data, null, 2)}`)
        }
        
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.options_.apiKey}`
        }

        try {
            const response = await fetch(fullUrl, {
                method,
                headers,
                body: data ? JSON.stringify(data) : undefined
            })

            if (!response.ok) {
                const errorText = await response.text()
                this.logger_.error(`API request failed: ${response.status} ${response.statusText}`)
                this.logger_.error(`Error details: ${errorText}`)
                throw new Error(`API request failed: ${response.status} ${response.statusText}`)
            }

            if (method === 'DELETE') {
                return { success: true }
            }

            const responseData = await response.json()
            return responseData

        } catch (error) {
            this.logger_.error(`Request failed: ${error}`)
            throw error
        }
    }

    async createBrand(brand: Record<string, unknown>): Promise<Record<string, unknown>> {
        // Ensure the brand data matches Strapi's expected structure
        const strapiBrand = {
            name: brand.name,
            description: brand.description || null,
            logo: brand.logo || null,
            website: brand.website || null,
            slug: brand.slug || null,
            active: brand.active !== undefined ? brand.active : true
        }
        
        const response = await this.sendRequest("/brands", "POST", { data: strapiBrand })
        return response.data
    }

    async deleteBrand(id: string): Promise<{ success: boolean }> {
        return await this.sendRequest(`/brands/${id}`, "DELETE")
    }

    async retrieveBrands(): Promise<Record<string, unknown>[]> {
        const response = await this.sendRequest("/brands", "GET")
        return response.data || []
    }

    async retrieveBrand(id: string): Promise<Record<string, unknown> | null> {
        try {
            const response = await this.sendRequest(`/brands/${id}`, "GET")
            return response.data
        } catch (error) {
            this.logger_.error(`Failed to retrieve brand ${id}: ${error}`)
            return null
        }
    }

    async updateBrand(id: string, brand: Record<string, unknown>): Promise<Record<string, unknown>> {
        // Ensure the brand data matches Strapi's expected structure
        const strapiBrand = {
            name: brand.name,
            description: brand.description || null,
            logo: brand.logo || null,
            website: brand.website || null,
            slug: brand.slug || null,
            active: brand.active !== undefined ? brand.active : true
        }
        
        const response = await this.sendRequest(`/brands/${id}`, "PUT", { data: strapiBrand })
        return response.data
    }
}

export default CmsModuleService