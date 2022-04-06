// eslint-disable-next-line node/no-missing-import
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { assert } from "console";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";

import {
  LoveIsLoveCollection,
  LoveIsLoveCollection__factory,
  // eslint-disable-next-line node/no-missing-import
} from "../typechain-types";

describe("Tests LoveIsLoveCollection", async function () {
  let owner: SignerWithAddress,
    user1: SignerWithAddress,
    user2: SignerWithAddress,
    user3: SignerWithAddress;
  let maxSupply: BigNumber;

  let lil: LoveIsLoveCollection;
  this.beforeEach(async () => {
    [owner, user1, user2, user3] = await ethers.getSigners();
    const LIL = new LoveIsLoveCollection__factory(owner);
    lil = await LIL.deploy();
  });

  // describe("Deployment", async function () {
  //   it("should fail if deployer don't have 10 premined NFTs", async function () {
  //     const deployerLILBalance = await lil.balanceOf(owner.address);
  //     expect(deployerLILBalance).to.equal(10);
  //   });
  //   it("should fail if maxSupply is not 170", async function () {
  //     maxSupply = await lil.maxSupply();
  //     expect(maxSupply).to.equal(170);
  //   });
  // });

  // describe("Minting", async function () {
  //   it("should fail if owner mint balance is not 11 after mint 1 more", async function () {
  //     await lil.mint(1);
  //     const ownerLILBalance = await lil.balanceOf(owner.address);
  //     expect(ownerLILBalance).to.equal(11);
  //   });

  //   it("should fail if user mint amount is less than cost", async function () {
  //     const cost: BigNumber = await lil.cost();
  //     await expect(
  //       lil.connect(user1).mint(1, { value: cost.sub(1) })
  //     ).to.be.revertedWith("Mint amount less than cost");
  //   });

  //   it("should fail if user is unable to mint 1 nft", async function () {
  //     const cost: BigNumber = await lil.cost();
  //     await lil.connect(user1).mint(1, { value: cost });
  //     // .mint(1, { value: ethers.utils.parseEther("1.0") });
  //     const user1LILBalance = await lil.balanceOf(user1.address);
  //     expect(user1LILBalance).to.equal(1);
  //   });

  //   it("should fail if user is unable to mint 3 nft", async function () {
  //     const cost: BigNumber = await lil.cost();
  //     await lil.connect(user1).mint(3, { value: cost.mul(3) });
  //     const user1LILBalance = await lil.balanceOf(user1.address);
  //     expect(user1LILBalance).to.equal(3);
  //   });

  //   it("should fail if user mint is more than maxSupply", async function () {
  //     await lil.mint(maxSupply.sub(10));
  //     const ownerLILBalance = await lil.balanceOf(owner.address);
  //     expect(ownerLILBalance).to.equal(maxSupply);
  //     await expect(lil.mint(1)).to.be.revertedWith(
  //       "Mint amount exceeds max supply"
  //     );
  //   });
  // });

  describe("Transaction", async function () {
    it("transfer 1 nft to user 1 to user 2", async function () {
      await lil.transferFrom(owner.address, user1.address, 10);
      await lil.transferFrom(user1.address, user2.address, 10);
      expect(await lil.balanceOf(user2.address)).equal(1);
    });
  });
  // describe("Owner", async function () {
  //   it("fail if user can withdraw", async function () {
  //     await expect(lil.connect(user1).withdraw()).to.be.revertedWith(
  //       "Ownable: caller is not the owner"
  //     );
  //   });
  //   it("withdraw", async function () {
  //     await lil.setRoyalties(owner.address, 5000);
  //     await lil.setApprovalForAll(user1.address, true);
  //     console.log(owner.address, await owner.getBalance());
  //     const cost: BigNumber = await lil.cost();
  //     await lil.connect(user1).mint(3, { value: cost.mul(3) });
  //     const user1LILBalance = await lil.balanceOf(user1.address);
  //     expect(user1LILBalance).to.equal(3);
  //     const oldBalance = await owner.getBalance();
  //     console.log(owner.address, await owner.getBalance());
  //     console.log(cost.mul(3));
  //     await lil.withdraw();
  //     console.log(owner.address, await owner.getBalance());
  //     // console.log(owner.address, (await owner.getBalance()).sub(oldBalance));
  //     const xx = await lil.ownerOf(11);
  //     console.log(xx);
  //     // lil.setApprovalForAll
  //     // }

  //     await lil.connect(user1).transferFrom(user1.address, user2.address, 11);
  //     await lil.connect(user1).transferFrom(user1.address, user2.address, 12);
  //     await lil.connect(user1).transferFrom(user1.address, user2.address, 13);
  //     // await lil.withdraw();

  //     console.log(owner.address, await owner.getBalance());
  //   });
  // });

  // it("Deployment", async function () {
  //   const [deployer, user1, user2] = await ethers.getSigners();
  //   console.log("Deploying contracts with the account:", deployer.address);
  //   console.log("Account balance:", (await deployer.getBalance()).toString());

  //   const LoveIsLoveCollection = new LoveIsLoveCollection__factory(deployer);
  //   const loveIsLoveCollection = await LoveIsLoveCollection.deploy();

  //   await loveIsLoveCollection.setRoyalties(deployer.address, 500);
  //   await loveIsLoveCollection.mint(deployer.address);
  //   let balance = await loveIsLoveCollection.balanceOf(deployer.address);
  //   console.log("Balance:", balance.toString());
  //   await loveIsLoveCollection.mint(deployer.address);
  //   balance = await loveIsLoveCollection.balanceOf(deployer.address);
  //   console.log("Balance:", balance.toString());
  //   console.log("Account balance:", (await deployer.getBalance()).toString());

  //   expect(balance).to.equal(2);

  //   await loveIsLoveCollection.connect(user1).mint(user1.address);
  //   console.log("Account balance:", (await deployer.getBalance()).toString());
  //   balance = await loveIsLoveCollection
  //     .connect(user1)
  //     .balanceOf(user1.address);
  //   console.log("Balance:", balance.toString());

  //   // loveIsLoveCollection.

  //   // expect(await greeter.greet()).to.equal("Hola, mundo!");
  // });
});
