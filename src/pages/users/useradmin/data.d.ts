export interface UserListItem {
  id: number;
  isEnabled: number;
  username: string;
  nickName: string;
  isAdmin: boolean;
  mobileNumber: string;
  email: string;
  status: number;
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
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
