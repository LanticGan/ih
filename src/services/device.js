import request from '@/utils/request';

export async function getAnimaDetail(params) {
  return request('/yunmu/api/animal/detail', {
    method: 'POST',
    data: params,
  });
}

export async function getDeviceList(params) {
  return request('/yunmu/api/animal/findPageInfo', {
    method: 'POST',
    data: params,
  });
}

