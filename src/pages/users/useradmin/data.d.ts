export interface UserListItem {
  id: number;
  username?: string;
  nickName?: string;
  mobileNumber?: string;
  email?: string;
  emailStatus?: number;
  mobileNumberStatus?: number;
  version?: number;
  activeStatus?: number;
  registerType?: number;
  version?: number;
  id?: number;
  isAdmin?: boolean;
  isAccountNotExpired?: boolean;
  isAccountNotLocked?: boolean;
  isCompanyAccount?: boolean;
  isEnabled?: boolean;
  isInnerAccount?: boolean;  
  isPrimaryAccount?: boolean;
  updateTime: Date;
  createTime: Date;
}     

export interface UserListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface UserListData {
  list: UserListItem[];
  pagination: Partial<UserListPagination>;
}

export interface UserListParams {
  sorter?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
