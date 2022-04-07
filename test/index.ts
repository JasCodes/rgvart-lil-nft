// eslint-disable-next-line node/no-missing-import
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";

import {
  RGVLILRinkeby,
  RGVLILRinkeby__factory,
  // eslint-disable-next-line node/no-missing-import
} from "../typechain-types";

describe("Tests LoveIsLoveCollection", async function () {
  let lil: RGVLILRinkeby;

  let owner: SignerWithAddress,
    user1: SignerWithAddress,
    user2: SignerWithAddress,
    user3: SignerWithAddress;

  this.beforeEach(async () => {
    [owner, user1, user2, user3] = await ethers.getSigners();
    const LIL = new RGVLILRinkeby__factory(owner);
    lil = await LIL.deploy();
  });

  describe("Deployment", async function () {
    it("should fail if deployer don't have 10 premined NFTs", async function () {
      const deployerLILBalance = await lil.balanceOf(owner.address);
      expect(deployerLILBalance).to.equal(10);
    });
    it("should fail if maxSupply is not 170", async function () {
      expect(await lil.maxSupply()).to.equal(170);
    });
  });

  describe("Minting", async function () {
    it("should fail if owner mint balance is not 11 after mint 1 more", async function () {
      await lil.mint(1);
      const ownerLILBalance = await lil.balanceOf(owner.address);
      expect(ownerLILBalance).to.equal(11);
    });

    it("should fail if user mint amount is less than cost", async function () {
      const cost: BigNumber = await lil.cost();
      await expect(
        lil.connect(user1).mint(1, { value: cost.sub(1) })
      ).to.be.revertedWith("Mint amount less than cost");
    });

    it("should fail if user is unable to mint 1 nft", async function () {
      const cost: BigNumber = await lil.cost();
      await lil.connect(user1).mint(1, { value: cost });
      // .mint(1, { value: ethers.utils.parseEther("1.0") });
      const user1LILBalance = await lil.balanceOf(user1.address);
      expect(user1LILBalance).to.equal(1);
    });

    it("should fail if user is unable to mint 3 nft", async function () {
      const cost: BigNumber = await lil.cost();
      await lil.connect(user1).mint(3, { value: cost.mul(3) });
      const user1LILBalance = await lil.balanceOf(user1.address);
      expect(user1LILBalance).to.equal(3);
    });

    it("should fail if user mint is more than maxSupply", async function () {
      const maxSupply: BigNumber = await lil.maxSupply();
      await lil.mint(maxSupply.sub(10));
      const ownerLILBalance = await lil.balanceOf(owner.address);
      expect(ownerLILBalance).to.equal(maxSupply);
      await expect(lil.mint(1)).to.be.revertedWith(
        "Mint amount exceeds max supply"
      );
    });
  });

  describe("Owner", async function () {
    it("fail if user can withdraw", async function () {
      await expect(lil.connect(user1).withdraw()).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });
    it("fail if user can withdraw", async function () {
      await expect(lil.connect(user1).withdraw()).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });
  });
});
