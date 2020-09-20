import request from '@/utils/request';

export async function updateConfig(params) {
  return request('/yunmu/api/config/update', {
    method: 'POST',
    data: params,
  });
}

export async function getConfig(params) {
  return request('/yunmu/api/config/detail', {
    method: 'POST',
    data: params,
  });
}