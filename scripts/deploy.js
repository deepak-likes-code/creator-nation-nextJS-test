const { ethers } = require("hardhat");

async function main() {
    const NFTMarket = await ethers.getContractFactory("NFTMarket");
    const MyToken = await ethers.getContractFactory("MyToken")
    // Start deployment, returning a promise that resolves to a contract object
    // const nftMarket = await NFTMarket.deploy();

    // console.log("NFTMarket Contract deployed to address:", nftMarket.address);

    const nft = await MyToken.deploy("creatorNation", 2);
    console.log("NFT Contract deployed to address:", nft.address);

    const txn = await nft.registerCreator("0x80cD8Dcdc1521A36221f2BC87788D4e15E4C6Ec2", "Creator1")
    txn.wait()

    console.log("Creator Registered")
}
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });