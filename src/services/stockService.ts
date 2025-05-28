import axios from 'axios';
import authService from './authService';

// Get API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'https://api.example.com';

export interface StockBalance {
  id: string;
  type: string;
  quantity: number;
  currentValue: number;
  currencyCode: string;
}

export interface VestingSchedule {
  id: string;
  vestingDate: string;
  quantity: number;
  estimatedValue: number;
  currencyCode: string;
  status: 'upcoming' | 'vested' | 'exercised';
}

export interface Transaction {
  id: string;
  date: string;
  type: 'grant' | 'vest' | 'exercise' | 'sell';
  quantity: number;
  value: number;
  currencyCode: string;
}

class StockService {
  private getAuthHeader() {
    const token = authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async getStockBalances(): Promise<StockBalance[]> {
    try {
      const response = await axios.get(`${API_URL}/stock/balances`, {
        headers: this.getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching stock balances:', error);
      // Return mock data for development/demo purposes
      return [
        {
          id: '1',
          type: 'RSU',
          quantity: 100,
          currentValue: 15000,
          currencyCode: 'USD'
        },
        {
          id: '2',
          type: 'Option',
          quantity: 50,
          currentValue: 7500,
          currencyCode: 'USD'
        }
      ];
    }
  }

  async getVestingSchedules(): Promise<VestingSchedule[]> {
    try {
      const response = await axios.get(`${API_URL}/stock/vesting`, {
        headers: this.getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching vesting schedules:', error);
      // Return mock data for development/demo purposes
      const today = new Date();
      const nextMonth = new Date(today);
      nextMonth.setMonth(today.getMonth() + 1);
      const nextQuarter = new Date(today);
      nextQuarter.setMonth(today.getMonth() + 3);
      
      return [
        {
          id: '1',
          vestingDate: nextMonth.toISOString().split('T')[0],
          quantity: 25,
          estimatedValue: 3750,
          currencyCode: 'USD',
          status: 'upcoming'
        },
        {
          id: '2',
          vestingDate: nextQuarter.toISOString().split('T')[0],
          quantity: 25,
          estimatedValue: 3750,
          currencyCode: 'USD',
          status: 'upcoming'
        },
        {
          id: '3',
          vestingDate: today.toISOString().split('T')[0],
          quantity: 25,
          estimatedValue: 3750,
          currencyCode: 'USD',
          status: 'vested'
        }
      ];
    }
  }

  async getTransactionHistory(): Promise<Transaction[]> {
    try {
      const response = await axios.get(`${API_URL}/stock/transactions`, {
        headers: this.getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      // Return mock data for development/demo purposes
      const today = new Date();
      const lastMonth = new Date(today);
      lastMonth.setMonth(today.getMonth() - 1);
      const twoMonthsAgo = new Date(today);
      twoMonthsAgo.setMonth(today.getMonth() - 2);
      
      return [
        {
          id: '1',
          date: twoMonthsAgo.toISOString().split('T')[0],
          type: 'grant',
          quantity: 100,
          value: 15000,
          currencyCode: 'USD'
        },
        {
          id: '2',
          date: lastMonth.toISOString().split('T')[0],
          type: 'vest',
          quantity: 25,
          value: 3750,
          currencyCode: 'USD'
        },
        {
          id: '3',
          date: today.toISOString().split('T')[0],
          type: 'exercise',
          quantity: 25,
          value: 3750,
          currencyCode: 'USD'
        }
      ];
    }
  }
}

export default new StockService();