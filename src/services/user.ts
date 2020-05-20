import request from '@/utils/request';
import { UserListParams } from '../pages/users/useradmin/data.d';

export async function queryList(params?: UserListParams) {
  return request('/v3/user/list',{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: UserListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: UserListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}


export async function queryCurrent(): Promise<any> {
  return request('/v3/user/currentUser' ,{
    method: 'POST'
  });
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
