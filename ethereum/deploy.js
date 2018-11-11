const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'toast detail shoulder sustain heavy gentle issue base guess addict guard glove',
  'https://rinkeby.infura.io/v3/6be7b0b1c462485fb5e361797afe5698'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '6500000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();
