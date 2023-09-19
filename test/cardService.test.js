/* External Imports */
// const { ethers, network,} = require('hardhat')
const { ethers, getChainId} = require('hardhat')
const chai = require('chai')
const { solidity } = require('ethereum-waffle')
const { assert } = chai

const {
  deployContract,
  deployUpgradeContract,
  isContractTransferSuccess
} = require('../scripts/utils/helper')

chai.use(solidity)

describe(`card service`, () => {
  let cardServiceContract
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
    cardServiceContract = await deployUpgradeContract(deployer, "CardService");

  })


  it('send normal case', async function () {

    let amount = 10000;

    const beforeBalance = await ethers.provider.getBalance(deployer.address);
    console.log(beforeBalance);

    let isSucess = await isContractTransferSuccess(
      await cardServiceContract.connect(user).send({value:amount})
    )

    const afterBalance = await ethers.provider.getBalance(deployer.address);
    console.log(afterBalance);

    let result = afterBalance.sub(beforeBalance)

    
    console.log("send result ",isSucess,result);
    assert.equal(result,amount)


  })

  it('set receiver', async function () {

    let isSucess = await isContractTransferSuccess(
      await cardServiceContract.connect(deployer).setReceiver(user.address)
    )    
    console.log("set receiver ",isSucess);

    let result = await cardServiceContract.connect(deployer).getReceiver()

    assert.equal(result,user.address)

  })


})
