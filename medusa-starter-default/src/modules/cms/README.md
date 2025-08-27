# CMS Module for Strapi Integration

This module provides integration between Medusa and Strapi CMS for managing brand data.

## Setup

### 1. Environment Variables

Add these to your `.env` file:

```bash
STRAPI_API_KEY=your_strapi_api_key_here
STRAPI_BASE_URL=http://localhost:1337/api
```

### 2. Strapi Configuration

Ensure your Strapi instance is running and has the brand content type created. The module expects the following brand structure:

```json
{
  "name": "string (required)",
  "description": "text",
  "logo": "media",
  "website": "string",
  "slug": "uid",
  "active": "boolean"
}
```

### 3. Medusa Brand Model

The Medusa brand model now includes all the same fields as Strapi:

```typescript
{
  id: string
  name: string
  description?: string
  logo?: string
  website?: string
  slug?: string
  active: boolean
  created_at: Date
  updated_at: Date
  deleted_at?: Date
}
```

### 4. Usage

```typescript
import CmsModuleService from "./modules/cms/service"

const cmsService = new CmsModuleService(
  { logger, configModule },
  {
    apiKey: "your_api_key",
    baseUrl: "http://localhost:1337/api"
  }
)

// Create a brand with all fields
const newBrand = await cmsService.createBrand({
  name: "Nike",
  description: "Just Do It",
  logo: "https://example.com/logo.png",
  website: "https://nike.com",
  slug: "nike",
  active: true
})

// Retrieve all brands
const brands = await cmsService.retrieveBrands()

// Retrieve a specific brand
const brand = await cmsService.retrieveBrand("brand_id")

// Update a brand
const updatedBrand = await cmsService.updateBrand("brand_id", {
  description: "Updated description",
  active: false
})

// Delete a brand
await cmsService.deleteBrand("brand_id")
```

## API Endpoints

The service communicates with Strapi using these endpoints:

- `GET /brands` - Retrieve all brands
- `GET /brands/:id` - Retrieve a specific brand
- `POST /brands` - Create a new brand
- `PUT /brands/:id` - Update a brand
- `DELETE /brands/:id` - Delete a brand

## Data Synchronization

The CMS service automatically maps data between Medusa and Strapi formats:
- Ensures all fields are properly passed through
- Handles optional fields with null values when not provided
- Maintains data consistency between both systems

## Error Handling

The service includes comprehensive error handling and logging. All API failures are logged and proper error messages are thrown for debugging.
