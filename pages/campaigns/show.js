import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    return {
      address: props.query.address,
      campaignDescription: summary[0],
      campaignName: summary[1],
      minimumContribution: summary[2],
      balance: summary[3],
      approversCount: summary[4],
      manager: summary[5]
    };
  }

  renderCards() {
    const {
      campaignDescription,
      campaignName,
      balance,
      manager,
      minimumContribution,
      approversCount
    } = this.props;

    const items = [

      {
        header: campaignName,
        meta: 'Campaign Name',
        description:
          '',
        style: { overflowWrap: 'break-word' }
      },

      {
        header: campaignDescription,
        meta: 'Campaign Description',
        description:
          '',
        style: { overflowWrap: 'break-word' }
      },

      {
        header: manager,
        meta: 'Address of Manager',
        description:
          'The manager created this campaign',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description:
          'You must contribute at least this much wei to become an contributor'
      },
      {
        header: approversCount,
        meta: 'Number of Contributors',
        description:
          'Number of people who have already donated to this campaign'
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description:
          'The balance is how much money this campaign has managed to raised'
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
