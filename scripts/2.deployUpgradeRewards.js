const {
    getInitAddress,
    deployUpgradeContract,
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


    let cardServiceContract = await deployUpgradeContract(deployer, "CardService");
    await writeConfig("1config","1config","CARD_SERVICE_CONTRACT_ADDRESS",cardServiceContract.address);

    
}

main();

