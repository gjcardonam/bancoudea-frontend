export interface TransactionDTO {
  id: number;
  senderAccountNumber: string;
  receiverAccountNumber: string;
  amount: number;
  timestamp: string;
}

export interface TransferRequestDTO {
  senderAccountNumber: string;
  receiverAccountNumber: string;
  amount: number;
}
