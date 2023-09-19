/* External Imports */
// const { ethers, network,} = require('hardhat')
const { ethers, getChainId} = require('hardhat')
const chai = require('chai')
const { solidity } = require('ethereum-waffle')
const { assert } = chai

const {
  deployContract,
  isContractTransferSuccess
} = require('../scripts/utils/helper')

chai.use(solidity)

describe(`card service`, () => {
  let cardNFTContract
  let deployer, user

  before(`deploy contact and setting `, async () => {

    let chainID = await getChainId();
    let accounts = await ethers.getSigners()
    deployer = accounts[0];
    user = accounts[1];

    console.log("chainID is :" + chainID);
    console.log("deployer   :" + deployer.address);
    console.log("user       :" + user.address);

    //deploy CardService
    cardNFTContract = await deployContract(deployer, "CardNFT","cardNFT","CN");

  })


  it('set Fee', async function () {

    let amount = 10000;

    let isSucess = await isContractTransferSuccess(
      await cardNFTContract.connect(deployer).setFee(amount)
    )
    let result = await cardNFTContract.connect(deployer).getFee()
    
    console.log("set fee ",isSucess,result);
    assert.equal(result,amount)


  })

  it('set receiver', async function () {

    let isSucess = await isContractTransferSuccess(
      await cardNFTContract.connect(deployer).setReceiver(user.address)
    )    
    console.log("set receiver ",isSucess);

    let result = await cardNFTContract.connect(deployer).getReceiver()

    assert.equal(result,user.address)

  })


  // function mint(
  //   address _to,
  //   uint256 _tokenId,
  //   string memory _tokenURI


  it('mint NFT ', async function () {

    let amount = 10000;
    let tokenId = 1;
    let url = "https://test/url"
    let isSucess = await isContractTransferSuccess(
      await cardNFTContract.connect(deployer).mint(user.address,tokenId,url,{value:amount})
    )    
    console.log("set receiver ",isSucess);

    let resultUrl = await cardNFTContract.connect(deployer).tokenURI(tokenId)
    assert.equal(url,resultUrl)

  })



})
