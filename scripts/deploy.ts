import { ethers, run, network } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { LoveIsLoveCollection__factory } from "../typechain-types";

async function main() {
  console.log(network.name);

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const LoveIsLoveCollection = new LoveIsLoveCollection__factory(deployer);
  const loveIsLoveCollection = await LoveIsLoveCollection.deploy();
  console.log("Deployment Started...");
  console.log(
    "LoveIsLoveCollection deployed to:",
    loveIsLoveCollection.address
  );

  // await verify(loveIsLoveCollection.address);
}

// async function verify(address: string) {
//   try {
//     await run("verify:verify", {
//       address,
//       arguments: ["--network", network.name],
//     });
//   } catch (e) {
//     await verify(address);
//   }
// }

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
