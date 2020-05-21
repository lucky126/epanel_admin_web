import request from '@/utils/request';
import { UserListParams } from '../pages/users/useradmin/data.d';

export async function queryList(params?: UserListParams) {
  request.post('/v3/user/list',{
    data: {
      ...params,
    },
    getResponse: true
  }).then(function({ data, response }) {
    // let result = data.data
    // console.log(result);
    // return result;

    const res:any[] = [{activeStatus: 0,
      createTime: "2018-02-12 16:15:35",
      email: "admin@epanel.cn",
      emailStatus: 1,
      id: 1,
      isAccountNotExpired: true,
      isAccountNotLocked: true,
      isAdmin: true,
      isCompanyAccount: false,
      isEnabled: true,
      isInnerAccount: true,
      isPrimaryAccount: false,
      mobileNumber: "",
      mobileNumberStatus: 0,
      nickName: "管理员",
      registerType: 1,
      updateTime: "2018-02-12 16:15:35",
      username: "admin",
      version: 0}];
   const result = {
     data: res,
     total: res.length,
     success: true,
     pageSize: 10,
     current: 1,
   };
   return result;
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
