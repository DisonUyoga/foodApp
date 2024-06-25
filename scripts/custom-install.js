const { execSync } = require("child_process");

try {
  console.log("Running custom npm install with --legacy-peer-deps...");
  execSync("npm install --force or --legacy-peer-deps", { stdio: "inherit" });
  console.log("Custom npm install completed.");
} catch (error) {
  console.error("Error during custom npm install:", error);
  process.exit(1);
}
