pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(string name, string description, uint minimum) public {
        address newCampaign = new Campaign(name, description, minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {

    string public campaignName;
    string public campaignDescription;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;


    function Campaign(string name, string description, uint minimum, address creator) public {
        campaignDescription = description;
        campaignName = name;
        manager = creator;
        minimumContribution = minimum;
    }


    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }


    function getSummary() public view returns (
      string, string, uint, uint, uint, address
      ) {
        return (
          campaignDescription,
          campaignName,  
          minimumContribution,
          this.balance,
          approversCount,
          manager
        );
    }

}
