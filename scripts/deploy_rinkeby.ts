import { ethers, network, run } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { RGVLILRinkeby__factory } from "../typechain-types";

async function main() {
  console.log(network.name);

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const LIL = new RGVLILRinkeby__factory(deployer);
  const lil = await LIL.deploy();
  console.log("Deployment Started...");
  console.log("RGVart - LoveIsLove Collection is deployed to:", lil.address);
  await etherscan_verify(lil.address);
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function etherscan_verify(address: string) {
  try {
    await run("verify:verify", {
      network: network.name,
      contract: "contracts/rgv_lil_rinkeby.sol:RGVLILRinkeby",
      address,
      cconstructorArguments: [],
    });
  } catch (e) {
    const message = (e as Error).message;
    console.log(message);
    if (message.includes("Already Verified")) {
      console.log(`Contract: ${address} verified on Etherscan`);
      return;
    }
    await sleep(2000);
    await await etherscan_verify(address);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
