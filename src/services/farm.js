import request from '@/utils/request';

export async function createFarm(params) {
  return request('/yunmu/api/farm/create', {
    method: 'POST',
    data: params,
  });
}

export async function getFarmList(params) {
  return request('/yunmu/api/farm/findPageInfo', {
    method: 'POST',
    data: params,
  });
}

export async function getFarmOptions(params) {
  return request('/yunmu/api/farm/list', {
    method: 'POST',
    data: params,
  });
}
