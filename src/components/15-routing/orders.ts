export interface Order {
  id: string;
  customer: string;
  status: 'delivered' | 'pending';
  total: number;
}

export const ORDERS: Order[] = [
  { id: '1001', customer: 'Ada', status: 'delivered', total: 24.5 },
  { id: '1002', customer: 'Grace', status: 'pending', total: 12.0 },
  { id: '1003', customer: 'Alan', status: 'delivered', total: 38.9 },
  { id: '1004', customer: 'Edsger', status: 'pending', total: 9.75 },
];
