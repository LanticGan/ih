import request from '@/utils/request';

export async function createUser(params) {
  return request('/yunmu/api/users/create', {
    method: 'POST',
    data: params,
  });
}

export async function getUserList(params) {
  return request('/yunmu/api/users/index', {
    method: 'POST',
    data: params,
  });
}

export async function updateUser(params) {
  return request('/yunmu/api/users/update', {
    method: 'POST',
    data: params,
  });
}
