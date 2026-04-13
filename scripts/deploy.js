const hre = require("hardhat");

async function main() {
  const { ethers, network } = hre;
  const chainId = network.config.chainId ?? "unknown";

  const confessionFee = ethers.parseEther("0.001");
  const unlockFee = ethers.parseEther("0.0005");

  console.log(`Deploying BluffConfessions to Citrea (${network.name}, chainId ${chainId})...`);
  console.log(`  Confession fee: ${ethers.formatEther(confessionFee)} cBTC`);
  console.log(`  Unlock fee (read full text): ${ethers.formatEther(unlockFee)} cBTC`);

  const signers = await ethers.getSigners();
  if (signers.length === 0) {
    console.error(`
No deployer account. Add your wallet private key to a root ".env" or ".env.local" file:

  PRIVATE_KEY=0x...   (never commit this file; it is gitignored)

Fund that address with Citrea testnet cBTC, then run: npm run deploy:testnet
`);
    process.exit(1);
  }
  console.log(`  Deployer: ${signers[0].address}`);

  const BluffConfessions = await ethers.getContractFactory("BluffConfessions");
  const bluff = await BluffConfessions.deploy(confessionFee, unlockFee);
  await bluff.waitForDeployment();

  const address = await bluff.getAddress();
  console.log(`\nBluffConfessions deployed to: ${address}`);
  console.log(`\nFrontend: set in frontend/.env.local`);
  console.log(`  NEXT_PUBLIC_CONTRACT_ADDRESS=${address}`);
  console.log(`  NEXT_PUBLIC_UNLOCK_FEE=${unlockFee.toString()}`);
  if (chainId === 5115) {
    console.log(`\nExplorer (testnet): https://explorer.testnet.citrea.xyz/address/${address}`);
  } else if (chainId === 4114) {
    console.log(`\nExplorer (mainnet): https://explorer.mainnet.citrea.xyz/address/${address}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
