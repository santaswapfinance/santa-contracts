const Mistletoe = artifacts.require('Mistletoe.sol')
const MasterChef = artifacts.require('MasterChef.sol')
const Timelock = artifacts.require('Timelock.sol')

module.exports = async function(deployer) {

  await deployer.deploy(Mistletoe)
  const mistletoe = await Mistletoe.deployed()

  console.log(process.env.DEV_ADDRESS)

  await deployer.deploy(
    MasterChef,
    mistletoe.address,
    process.env.DEV_ADDRESS, 
    process.env.DEV_ADDRESS, 
    web3.utils.toWei("0.95"), 
    process.env.START_BLOCK
  )

  await mistletoe.mint(process.env.DEV_ADDRESS, '1000000000000000000000000', { from: process.env.DEV_ADDRESS })

  const masterChef = await MasterChef.deployed()
  await mistletoe.transferOwnership(masterChef.address)

  await deployer.deploy(
    Timelock,
    process.env.DEV_ADDRESS, 
    86400
  )

}
