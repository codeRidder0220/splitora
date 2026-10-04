interface SettlementExpense {
  amount: number;
  paidBy: string;
}

interface MemberBalance {
  member: string;
  paid: number;
  share: number;
  balance: number;
}

interface Settlement {
  from: string;
  to: string;
  amount: number;
}

export function calculateSettlement(
  members: string[],
  expenses: SettlementExpense[]
) {
  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const share = total / members.length;

  const paidMap: Record<string, number> = {};

  members.forEach((member) => {
    paidMap[member] = 0;
  });

  expenses.forEach((expense) => {
    paidMap[expense.paidBy] += expense.amount;
  });

  const balances: MemberBalance[] = members.map((member) => ({
    member,
    paid: paidMap[member],
    share,
    balance: paidMap[member] - share,
  }));

  const settlements: Settlement[] = [];

  const creditors = balances
    .filter((item) => item.balance > 0)
    .map((item) => ({
      member: item.member,
      amount: item.balance,
    }));

  const debtors = balances
    .filter((item) => item.balance < 0)
    .map((item) => ({
      member: item.member,
      amount: Math.abs(item.balance),
    }));

  let creditorIndex = 0;
  let debtorIndex = 0;

  while (
    creditorIndex < creditors.length &&
    debtorIndex < debtors.length
  ) {
    const creditor = creditors[creditorIndex];
    const debtor = debtors[debtorIndex];

    const amount = Math.min(
      creditor.amount,
      debtor.amount
    );

    settlements.push({
      from: debtor.member,
      to: creditor.member,
      amount,
    });

    creditor.amount -= amount;
    debtor.amount -= amount;

    if (creditor.amount === 0) {
      creditorIndex++;
    }

    if (debtor.amount === 0) {
      debtorIndex++;
    }
  }

  return {
    total,
    share,
    balances,
    settlements,
  };
}