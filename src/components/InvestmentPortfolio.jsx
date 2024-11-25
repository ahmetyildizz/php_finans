import React from 'react';
import { Card, Title, AreaChart, DonutChart, Metric, Text, TabGroup, TabList, Tab, TabPanels, TabPanel } from '@tremor/react';
import useBudgetStore from '../store/budgetStore';

function InvestmentPortfolio() {
  const { investments } = useBudgetStore();

  const portfolioData = [
    { date: '2023-01', Stocks: 45000, Crypto: 15000, "Real Estate": 120000 },
    { date: '2023-02', Stocks: 47000, Crypto: 18000, "Real Estate": 120000 },
    { date: '2023-03', Stocks: 48500, Crypto: 16000, "Real Estate": 125000 },
    { date: '2023-04', Stocks: 51000, Crypto: 19000, "Real Estate": 125000 },
    { date: '2023-05', Stocks: 49000, Crypto: 21000, "Real Estate": 130000 },
  ];

  const assetAllocation = [
    { name: 'Stocks', value: 49000 },
    { name: 'Crypto', value: 21000 },
    { name: 'Real Estate', value: 130000 },
    { name: 'Bonds', value: 25000 },
    { name: 'Cash', value: 15000 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <Title>Investment Portfolio</Title>
      
      <TabGroup>
        <TabList className="mt-4">
          <Tab>Portfolio Overview</Tab>
          <Tab>Performance</Tab>
          <Tab>Asset Allocation</Tab>
        </TabList>
        
        <TabPanels>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Card>
                <Text>Total Portfolio Value</Text>
                <Metric>$240,000</Metric>
              </Card>
              <Card>
                <Text>Monthly Return</Text>
                <Metric>+5.2%</Metric>
              </Card>
              <Card>
                <Text>Annual Return</Text>
                <Metric>+12.8%</Metric>
              </Card>
            </div>
          </TabPanel>
          
          <TabPanel>
            <Card className="mt-4">
              <Title>Portfolio Performance</Title>
              <AreaChart
                className="mt-4 h-72"
                data={portfolioData}
                index="date"
                categories={["Stocks", "Crypto", "Real Estate"]}
                colors={["indigo", "cyan", "orange"]}
              />
            </Card>
          </TabPanel>
          
          <TabPanel>
            <Card className="mt-4">
              <Title>Asset Allocation</Title>
              <DonutChart
                className="mt-4 h-72"
                data={assetAllocation}
                category="value"
                index="name"
                colors={["indigo", "cyan", "orange", "violet", "green"]}
              />
            </Card>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}

export default InvestmentPortfolio;