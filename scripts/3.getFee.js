const {
    attachContract,
    deployUpgradeContract,
    readConfig,
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
    let contractAddress = await readConfig("1config","CARD_SERVICE_CONTRACT_ADDRESS");

    // async function attachContract(contractName,contractAddress,account){
    let contract = attachContract("CardNFT",contractAddress,deployer)

    let result = await contract.getFee();
    console.log("xxl " ,result);
    

    
}

main();

