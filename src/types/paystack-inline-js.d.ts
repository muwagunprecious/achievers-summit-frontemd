declare module "@paystack/inline-js" {
  type PaystackTransactionConfig = {
    amount: number;
    currency?: string;
    email: string;
    key: string;
    metadata?: Record<string, unknown>;
    onCancel?: () => void;
    onSuccess?: (transaction: { reference: string }) => void;
    reference: string;
  };

  export default class PaystackPop {
    newTransaction(config: PaystackTransactionConfig): unknown;
    resumeTransaction(accessCode: string): unknown;
  }
}
