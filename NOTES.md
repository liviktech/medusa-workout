# Medusa Workout Project Notes

## Current Features
For detailed feature list, see: https://docs.medusajs.com/user-guide

### Core Functionality
- **Orders**
  - Admin can create orders for users
  - Manual payment capture available
- **Products**
  - Full CRUD operations
  - Collections, Categories, Multipart, and Bundle Products
  - Import options available
- **Inventory**
  - In Stock management
  - Product Variants
  - Reservations
- **Promotions**
  - Full Campaign customization
  - Promotion features
  - Price Lists

### Admin Features
- Invite system (admin-only)
- Separate dashboard folder that can run independently

## Missing Features
- Affiliation system
- Referrals system

## Limitations
Cannot upgrade/modify:
- Core DB schema and Database
- Workflow engine internals
- Core promotion/price resolution pipeline
- Upgrade path - Forking required

## Useful Resources

### Starter Templates
- **Storefront Starter**: https://github.com/medusajs/nextjs-starter-medusa.git
- **B2B Starter**: https://github.com/medusajs/b2b-starter-medusa (Includes admin, storefront, and backend)

### Examples & Integrations
- **Integrations and Recipes**: https://github.com/medusajs/examples
- **Workflow Examples**: https://github.com/medusajs/workflow-examples.git

### UI Component Libraries
- Shadcn UI materials
- Radix UI
- [Preline Templates](https://preline.co/templates.html)
- [Aceternity UI Components](https://ui.aceternity.com/components/3d-card-effect)
- [HyperUI Components](https://www.hyperui.dev/components/application)

### Deployment Guide:
https://docs.medusajs.com/learn/deployment/general

## Packages Requiring Research
- awilix
- opentelemetry
