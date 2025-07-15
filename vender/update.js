import fs from "fs";

const UPSTREAM_URL =
  "https://raw.githubusercontent.com/microsoft/vscode/main/src/vs/workbench/contrib/preferences/browser/settingsLayout.ts";
const VENDOR_FILE = "vender/settingsLayout.ts";

async function main() {
  // Fetch upstream file
  const upstream = await fetch(UPSTREAM_URL).then((res) => res.text());
  const local = fs.existsSync(VENDOR_FILE) ? fs.readFileSync(VENDOR_FILE, "utf8") : "";

  if (upstream.trim() !== local.trim()) {
    fs.writeFileSync(VENDOR_FILE, upstream, "utf8");
    console.log("vender/settingsLayout.ts updated.");
    if (process.env.GITHUB_OUTPUT) {
      fs.appendFileSync(process.env.GITHUB_OUTPUT, "updated=true\n");
    }
  } else {
    console.log("No changes.");
    if (process.env.GITHUB_OUTPUT) {
      fs.appendFileSync(process.env.GITHUB_OUTPUT, "updated=false\n");
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
