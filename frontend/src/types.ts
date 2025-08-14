export type Account = {
  id: string;
  availableBalance: number;
  currentBalance: number;
  officialName: string;
  mask: string;
  institutionId: string;
  name: string;
  type: string;
  subtype: string;
  appwriteItemId: string;
  shareableId: string;
};
export interface TotalBalanceBoxProps {
  accounts: Account[];
  totalBanks: number;
  totalCurrentBalance: number;
}
export interface DoughnutChartProps {
  accounts: Account[];
}
export interface CreditCardProps {
  account: Account;
  userName: string;
  showBalance?: boolean;
}
