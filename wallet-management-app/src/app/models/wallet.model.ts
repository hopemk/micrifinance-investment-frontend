export interface Wallet {
  id: string;
  name: string;
  balance: number;
  walletType: {
    id: string;
    name: string;
    entityStatus: string;
    createdBy: string;
    ownerId: string;
    dateCreated: string;
    dateUpdated: string;
    amountLimit: string;
  };
  account: {
    id: string;
    name: string;
    createdBy: string;
    ownerId: string;
    phoneNumber: string;
    dateCreated: string;
    dateUpdated: string;
    entityStatus: string;
  };
  createdBy: string;
  ownerId: string;
  dateCreated: string;
  dateUpdated: string;
  entityStatus: string;
  amountLimit: string;
}

export interface ApiResponse {
  status: string;
  message: string;
  data: Wallet[] | Wallet;
  metadata: any;
  errors: any;
}
