export interface UserListItem {
  id: number;
  username?: string;
  password?: string;
  repassword?: string;
  checkPassword?: string;
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
  isBindQq?: boolean;
  isBindWechat?: boolean;
  isBindWeibo?: boolean;
  isBindDingtalk?: boolean;
  updateTime: Date;
  createTime: Date;
  actionKey?: string;
  cash?: number;
}     

export interface AccountItem {
  cashBalance?: number;
  cashDisenabled?: number;
  cashUsable?: number;
  createTime: Date;
  creatorId?: number;
  mailBalance?: number;
  mailDisenabled?: number;
  mailUsable?: number;
  parentAccountId?: number;
  smsBalance?: number;
  smsDisenabled?: number;
  smsUsable?: number;
  status?: number;
  updateTime: Date;
  updaterId?: number;
  userId?: number;
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

export interface checkPasswordData {
  id: number;
  operatedUserId: number;
  password: string;
  action: string;
  key: string;
}


export interface resetPwData {
  id: number;
  password: string;
  repassword: string;
  action: string;
  key: string;
}

export interface setFlagData {
  id: number;
  flag?: boolean;
  action: string;
  key: string;
}

export interface setCashData {
  id: number;
  cash?: number;
  action: string;
  key: string;
}