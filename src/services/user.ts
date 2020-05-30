import request from '@/utils/request';
import { UserListParams, checkPasswordData, setFlagData, setCashData } from '../pages/users/useradmin/data.d';

export async function queryList(params?: UserListParams) : Promise<any> {
  return request('/v3/user/list',{
    method: 'POST',
    data: {
      ...params,
    },
  })
}

export async function getAccount(id: number) {
  return request(`/v3/user/${id}/account`, {
    method: 'GET',
  });
}

export async function checkPassword(params: checkPasswordData) {
  return request('/v3/user/checkPassword', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function resetPw(params: resetPwData) {
  return request('/v3/user/resetPassword', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function setAdmin(params: setFlagData) {
  return request('/v3/user/setAdmin', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function setInner(params: setFlagData) {
  return request('/v3/user/setInnerAccount', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function setEnabled(params: setFlagData) {
  return request('/v3/user/setEnabled', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function setCash(params: setCashData) {
  return request('/v3/user/setCash', {
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
