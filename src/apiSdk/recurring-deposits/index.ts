import axios from 'axios';
import queryString from 'query-string';
import { RecurringDepositInterface, RecurringDepositGetQueryInterface } from 'interfaces/recurring-deposit';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getRecurringDeposits = async (
  query?: RecurringDepositGetQueryInterface,
): Promise<PaginatedInterface<RecurringDepositInterface>> => {
  const response = await axios.get('/api/recurring-deposits', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createRecurringDeposit = async (recurringDeposit: RecurringDepositInterface) => {
  const response = await axios.post('/api/recurring-deposits', recurringDeposit);
  return response.data;
};

export const updateRecurringDepositById = async (id: string, recurringDeposit: RecurringDepositInterface) => {
  const response = await axios.put(`/api/recurring-deposits/${id}`, recurringDeposit);
  return response.data;
};

export const getRecurringDepositById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/recurring-deposits/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteRecurringDepositById = async (id: string) => {
  const response = await axios.delete(`/api/recurring-deposits/${id}`);
  return response.data;
};
