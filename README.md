# Instructions to run the app locally

To run the smart contract locally. Run `npm install` to install all the dependencies on the root folder. Then follow the steps:
- Run `npx hardhat node` to start a local blockchain with hardhat. 
- Then deploy the contracts to local blockchain with `npx hardhat run scripts/deploy.js --network localhost`
- Connect to localhost server on your metamask wallet and import an account to your metamask wallet.

Now you can start running the frontend. To run the frontend:
- Navigate to client folder. 
- Run `npm run dev` to start the server