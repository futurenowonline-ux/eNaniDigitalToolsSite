---
name: Web Project Accelerator
description: A collection of workflows, components, and best practices for rapidly building and deploying client websites using Next.js, Tailwind, and Vercel.
---

# Web Project Accelerator Skill

Use this skill when tasked with creating a new website for a client, or when adding standard features like feedback forms or WhatsApp integration to an existing project.

## Capabilities
- Rapidly initialize projects with a pre-defined Tailwind and SEO configuration.
- Integrate lightweight backend features using Google Sheets API.
- Deploy and verify projects on Vercel with built-in analytics.

## Workflows

### 1. Project Initialization
When starting a new project, follow these steps:
- Run `npx create-next-app@latest . --typescript --tailwind --eslint`.
- Configure `tailwind.config.js` with brand colors (usually primary, secondary, light, dark).
- Setup `layout.tsx` with standard metadata and `Vercel Analytics`.

### 2. Branding & UI
- Use the `FadeIn` component for all entry animations.
- Ensure the `WhatsAppButton` is present on all pages, configured with the client's number.
- Use `ProductCard` for showcasing services or goods.

### 3. Lead Generation (Contact Form)
- Setup a `ContactForm` component.
- Create an API route (`/api/feedback`) that connects to a Google Sheet.
- Ensure environment variables for Google credentials are added to `.env.local` and Vercel.

## Available Resources
Refer to the following components in the `sharo-bakery-website` project as templates:
- `app/components/FadeIn.tsx`
- `app/components/WhatsAppButton.tsx`
- `app/components/ContactForm.tsx`
- `app/api/feedback/route.ts`
