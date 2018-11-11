import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x3de5a5b20d5666a29e7d97abf7591fbe3a5fa243'
);

export default instance;
