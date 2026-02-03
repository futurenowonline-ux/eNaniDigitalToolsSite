---
name: AI Asset Gen
description: Generate and optimize product images using Nano Banana and Veo.
---

# AI Asset Gen

This skill automates the creation and optimization of product assets for the Sharo Bakery project.

## Instructions

1.  **Prompt Generation**:
    -   When provided with a product name and description, generate a highly detailed prompt for "Nano Banana Pro" (which maps to the `generate_image` tool).
    -   Focus on high-quality, professional food photography aesthetics (e.g., "studio lighting," "bokeh background," "close-up macro").

2.  **Asset Generation**:
    -   Call `generate_image` with the generated prompt.
    -   Save the resulting image to `/public/images/products/` with a descriptive name (e.g., `chocolate_cake.png`).

3.  **Image Optimization**:
    -   Automatically run the optimization script to convert the generated image to `.webp` format.
    -   Usage: `python .agent/skills/ai-asset-gen/scripts/optimize_image.py /absolute/path/to/image.png`.

4.  **Data Integration**:
    -   Locate `data/products.js`.
    -   Find the relevant product entry or create a new one.
    -   Update the `image` path to point to the new `.webp` file in `/images/products/`.

## Verification
- Verify the `.webp` file exists in `/public/images/products/`.
- Check `data/products.js` to ensure the path is updated correctly.
