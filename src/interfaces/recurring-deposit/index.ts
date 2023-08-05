import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface RecurringDepositInterface {
  id?: string;
  amount: number;
  frequency: string;
  start_date: any;
  end_date: any;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface RecurringDepositGetQueryInterface extends GetQueryInterface {
  id?: string;
  frequency?: string;
  organization_id?: string;
}
