import request from '@/utils/request';
import { UserListParams } from '../pages/users/useradmin/data.d';

export async function queryList(params?: UserListParams) : Promise<any> {
  let result =  request('/v3/user/list',{
    method: 'POST',
    data: {
      ...params,
    },
  })
  // console.log(result)
  return result;
}

export async function resetPw(params: UserListParams) {
  return request('/v3/user/resetPassword', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function setAdmin(params: UserListParams) {
  return request('/v3/user/setAdmin', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function setInner(params: UserListParams) {
  return request('/v3/user/setInnerAccount', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function setEnabled(params: UserListParams) {
  return request('/v3/user/setEnabled', {
    method: 'POST',
    data: {
      ...params,
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
