# Medusa Setup Guide

## Overview
Complete setup guide for Medusa e-commerce platform with workout management capabilities.

## Prerequisites
- Node.js (v18+) and Yarn installed
- PostgreSQL database running
- Git

## Installation Steps

### 1. Clone Repositories

#### Backend (Admin included)
```bash
git clone https://github.com/medusajs/medusa-starter-default.git
```

#### Storefront
```bash
git clone https://github.com/medusajs/nextjs-starter-medusa
```

#### Admin Dashboard
```bash
git clone https://github.com/medusajs/medusa.git
```
Copy the dashboard folder from `packages/admin/dashboard` to setup the admin dashboard separately

### 2. Install Dependencies

Navigate to each cloned directory and run:
```bash
yarn install
```

### 3. Environment Configuration

Create a `.env` file with `.env.template` in the `medusa-starter-default` directory:

Update the Database URL in the env file by replacing `username:password` with your actual PostgreSQL credentials.

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/medusa_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
COOKIE_SECRET=your-super-secret-cookie-key-here

# CORS Configuration
STORE_CORS=http://localhost:8000,http://localhost:3000
ADMIN_CORS=http://localhost:9000
AUTH_CORS=http://localhost:9000
```

### 4. Database Setup

#### Create and Setup Database
```bash
cd medusa-starter-default
npx medusa db:setup
```

#### Seed Database
```bash
yarn seed
```

## Running the Application

### Start Backend
```bash
cd medusa-starter-default
yarn dev
```

### Setup Admin Panel

#### Create Admin Invite
```bash
npx medusa user -e ${ADMIN_EMAIL} --invite
```

#### Complete Admin Setup
1. Navigate to: `http://localhost:5173/invite?token=[INVITE_TOKEN]`
2. Complete the signup form
3. Login to the admin dashboard


### Start Storefront

#### Get Publishable Key
1. Open the Admin Dashboard **Settings**
2. Select **Publishable API Keys**
3. Click **Create** at the top right
3. Add a **Title** and **Save**
4. Copy the generated publishable key
5. Update the storefront environment variable:

> Note: Due to seeding, If there is any other publishable keys in the list, that can also be used.

```env
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=your_publishable_key_here
```
#### Start the application
```bash
cd nextjs-starter-medusa
yarn dev
```

## Access URLs

- **Backend API:** http://localhost:9000
- **Admin Panel:** http://localhost:5173
- **Storefront:** http://localhost:8000

## Help

```bash
npx medusa help
```