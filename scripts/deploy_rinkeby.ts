import { ethers, network } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { RGVERC721__factory } from "../typechain-types";

async function main() {
  console.log(network.name);

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const RGVERC721 = new RGVERC721__factory(deployer);
  const lil = await RGVERC721.deploy(
    "RGVart - Love is Love NFT Collection",
    "LIL",
    "",
    "ipfs://bafkreibif7kntrgvu36pvqnrkd6rwrel3uxwewufwc5iyjbd42pzughaoi",
    ethers.utils.parseEther("0.01"),
    10
  );
  console.log("Deployment Started...");
  console.log("LoveIsLoveCollection is deployed to:", lil.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
