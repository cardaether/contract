const {
    deployContract,
    writeConfig,
} = require('./utils/helper')

const main = async () => {
 
    
    let chainID = await getChainId();
    let accounts = await ethers.getSigners()
    deployer = accounts[0];
    user = accounts[1];

    console.log("chainID is :" + chainID);
    console.log("deployer   :" + deployer.address);
    console.log("user       :" + user.address);

    cardNFTContract = await deployContract(deployer, "CardNFT","cardNFT","CN");
    await writeConfig("1config","1config","CARD_NFT_CONTRACT_ADDRESS",cardNFTContract.address);

}

main();

