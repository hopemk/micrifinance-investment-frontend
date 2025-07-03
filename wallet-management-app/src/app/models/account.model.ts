export interface Account {
  id: string;
  name: string;
  createdBy: string;
  phoneNumber: string;
  dateCreated: string;
  dateUpdated: string | null;
  entityStatus: string | null;
}

export interface ApiResponse {
  status: string;
  message: string;
  data: Account[] | Account;
}
