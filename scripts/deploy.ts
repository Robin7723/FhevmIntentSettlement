import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  console.log("Deploying EncryptedIntentProtocol...");

  const EncryptedIntentProtocol = await ethers.getContractFactory("EncryptedIntentProtocol");
  const contract = await EncryptedIntentProtocol.deploy();

  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();

  console.log(`EncryptedIntentProtocol deployed to: ${contractAddress}`);

  const deploymentInfo = {
    address: contractAddress,
    network: (await ethers.provider.getNetwork()).name,
    chainId: Number((await ethers.provider.getNetwork()).chainId),
    deployedAt: new Date().toISOString(),
  };

  const outputPath = path.join(__dirname, "..", "deployed-address.json");
  fs.writeFileSync(outputPath, JSON.stringify(deploymentInfo, null, 2));

  console.log(`Deployment info saved to: ${outputPath}`);
  console.log(deploymentInfo);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
