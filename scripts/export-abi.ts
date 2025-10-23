import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const contractName = "EncryptedIntentProtocol";
  const artifactPath = path.join(
    __dirname,
    "..",
    "artifacts",
    "contracts",
    `${contractName}.sol`,
    `${contractName}.json`
  );

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

  const abiOutputPath = path.join(__dirname, "..", "contract-abi.json");
  fs.writeFileSync(abiOutputPath, JSON.stringify(artifact.abi, null, 2));

  console.log(`ABI exported to: ${abiOutputPath}`);
  console.log(`Contract bytecode length: ${artifact.bytecode.length} bytes`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
