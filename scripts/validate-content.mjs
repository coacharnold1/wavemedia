// Validates src/lib/portfolio.ts. Run with: npm run validate:content
import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  portfolioItems,
  cinematographyCategories,
  photographyCategories,
} from "../src/lib/portfolio.ts";

const errors = [];
const warnings = [];
const slugs = new Set();

for (const item of portfolioItems) {
  const id = item.slug || "(missing slug)";
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(item.slug ?? "")) errors.push(`${id}: slug must be lowercase-hyphenated`);
  if (slugs.has(item.slug)) errors.push(`${id}: duplicate slug`);
  slugs.add(item.slug);

  if (!item.title?.trim()) errors.push(`${id}: missing title`);
  if (!item.description?.trim()) errors.push(`${id}: missing description`);
  if (!Number.isInteger(item.year) || item.year < 2000 || item.year > new Date().getFullYear() + 1)
    errors.push(`${id}: invalid year`);

  const valid = item.type === "video" ? cinematographyCategories : photographyCategories;
  if (!["video", "photo"].includes(item.type)) errors.push(`${id}: type must be video or photo`);
  else if (!valid.includes(item.category))
    errors.push(`${id}: category "${item.category}" not valid for ${item.type} (${valid.join(", ")})`);

  if (item.type === "video" && !item.videoUrl) warnings.push(`${id}: no videoUrl yet (placeholder)`);
  if (item.type === "video" && item.videoUrl && !/(youtube\.com|youtu\.be|vimeo\.com)/.test(item.videoUrl))
    errors.push(`${id}: videoUrl must be YouTube or Vimeo`);
  if (!item.image) warnings.push(`${id}: no image yet (placeholder)`);
  else if (item.image.startsWith("/") && !existsSync(join("public", item.image)))
    errors.push(`${id}: image file not found at public${item.image}`);
}

warnings.forEach((w) => console.warn(`warn  ${w}`));
errors.forEach((e) => console.error(`ERROR ${e}`));
console.log(`${portfolioItems.length} items, ${errors.length} errors, ${warnings.length} warnings`);
process.exit(errors.length ? 1 : 0);
