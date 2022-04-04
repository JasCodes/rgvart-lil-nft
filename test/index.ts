// eslint-disable-next-line node/no-missing-import
import { expect } from "chai";
import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { LoveIsLoveCollection__factory } from "../typechain-types";

describe("LoveIsLoveCollection", function () {
  it("Mint Nft", async function () {
    const [deployer, user1, user2] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const LoveIsLoveCollection = new LoveIsLoveCollection__factory(deployer);
    const loveIsLoveCollection = await LoveIsLoveCollection.deploy();

    await loveIsLoveCollection.setRoyalties(deployer.address, 500);
    await loveIsLoveCollection.mint(deployer.address);
    let balance = await loveIsLoveCollection.balanceOf(deployer.address);
    console.log("Balance:", balance.toString());
    await loveIsLoveCollection.mint(deployer.address);
    balance = await loveIsLoveCollection.balanceOf(deployer.address);
    console.log("Balance:", balance.toString());
    console.log("Account balance:", (await deployer.getBalance()).toString());

    expect(balance).to.equal(2);

    await loveIsLoveCollection.connect(user1).mint(user1.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
    balance = await loveIsLoveCollection
      .connect(user1)
      .balanceOf(user1.address);
    console.log("Balance:", balance.toString());

    // loveIsLoveCollection.

    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
// describe("Greeter", function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const [deployer] = await ethers.getSigners();
//     console.log("Deploying contracts with the account:", deployer.address);
//     console.log("Account balance:", (await deployer.getBalance()).toString());

//     const Greeter = new Greeter__factory(deployer);
//     const greeter = await Greeter.deploy("Hello, world!");
//     await greeter.deployed();

//     expect(await greeter.greet()).to.equal("Hello, world!");

//     const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

//     // wait until the transaction is mined
//     await setGreetingTx.wait();

//     expect(await greeter.greet()).to.equal("Hola, mundo!");
//   });
// });
