import request from '@/utils/request';

export async function getAnimaDetail(params) {
  return request('/yunmu/api/animal/detail', {
    method: 'POST',
    data: params,
  });
}

export async function getFenceList(params) {
  return request('/yunmu/api/fence/list', {
    method: 'POST',
    data: params,
  });
}

