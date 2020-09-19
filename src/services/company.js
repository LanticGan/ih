import request from '@/utils/request';

export async function createCompany(params) {
  return request('/yunmu/api/company/create', {
    method: 'POST',
    data: params,
  });
}

export async function findPageInfo(params) {
  return request('/yunmu/api/company/findPageInfo', {
    method: 'POST',
    data: params,
  });
}

export async function getDetail(params) {
  return request('/yunmu/api/company/detail', {
    method: 'POST',
    data: params,
  });
}

