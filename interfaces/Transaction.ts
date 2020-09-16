export interface Transaction {
  id?: number;
  description?: string;
  amount: number;
  isRecurring: boolean;
  isIncome: boolean;
}
