import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const htmlPath = path.resolve(__dirname, "../docs/index.html");
const pdfPath = path.resolve(
  __dirname,
  "../output/Sinisa_Kusic_Senior_Frontend_Engineer_CV.pdf",
);

const browser = await chromium.launch();
const page = await browser.newPage();

await page.goto(`file://${htmlPath}`, { waitUntil: "load" });

await page.pdf({
  path: pdfPath,
  printBackground: true,
  preferCSSPageSize: true,
  margin: {
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
  },
});

await browser.close();
