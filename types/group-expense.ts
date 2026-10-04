export interface GroupExpenseInput {
  groupId: string;
  title: string;
  amount: number;
  paidBy: string;
  date: string;
  note?: string;
}