import { useState, useEffect } from 'react';
import { Box, Container, Typography, Tab, Tabs, Paper, CircularProgress, Card, CardContent } from '@mui/material';
import stockService from '../services/stockService';
import type { StockBalance, VestingSchedule, Transaction } from '../services/stockService';
import useAuth from '../hooks/useAuth';
import Navigation from '../components/Navigation';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      style={{ paddingTop: '16px' }}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const Dashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [balances, setBalances] = useState<StockBalance[]>([]);
  const [vestingSchedules, setVestingSchedules] = useState<VestingSchedule[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [balancesData, vestingData, transactionsData] = await Promise.all([
          stockService.getStockBalances(),
          stockService.getVestingSchedules(),
          stockService.getTransactionHistory()
        ]);
        
        setBalances(balancesData);
        setVestingSchedules(vestingData);
        setTransactions(transactionsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress />
        </Box>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <Container maxWidth="sm" sx={{ pt: 2, pb: 8 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Welcome, {user?.name}
        </Typography>

      <Paper sx={{ width: '100%' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          aria-label="stock dashboard tabs"
        >
          <Tab label="Balances" id="tab-0" aria-controls="tabpanel-0" />
          <Tab label="Vesting" id="tab-1" aria-controls="tabpanel-1" />
          <Tab label="History" id="tab-2" aria-controls="tabpanel-2" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {balances.length > 0 ? (
              balances.map((balance) => (
                <Card key={balance.id}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {balance.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {balance.quantity}
                    </Typography>
                    <Typography variant="h6">
                      {balance.currentValue.toLocaleString('en-US', {
                        style: 'currency',
                        currency: balance.currencyCode,
                      })}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body1" align="center">
                No stock balances available
              </Typography>
            )}
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {vestingSchedules.length > 0 ? (
              vestingSchedules.map((schedule) => (
                <Card 
                  key={schedule.id}
                  sx={{ 
                    backgroundColor: 
                      schedule.status === 'vested' ? '#e3f2fd' : 
                      schedule.status === 'exercised' ? '#e8f5e9' : '#fff'
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {new Date(schedule.vestingDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status: {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {schedule.quantity}
                    </Typography>
                    <Typography variant="h6">
                      {schedule.estimatedValue.toLocaleString('en-US', {
                        style: 'currency',
                        currency: schedule.currencyCode,
                      })}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body1" align="center">
                No vesting schedules available
              </Typography>
            )}
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <Card key={transaction.id}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {new Date(transaction.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Type: {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {transaction.quantity}
                    </Typography>
                    <Typography variant="h6">
                      {transaction.value.toLocaleString('en-US', {
                        style: 'currency',
                        currency: transaction.currencyCode,
                      })}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body1" align="center">
                No transaction history available
              </Typography>
            )}
          </Box>
        </TabPanel>
      </Paper>
    </Container>
    </>
  );
};

export default Dashboard;