import request from '@/utils/request';

export async function getAnimaDetail(params) {
  return request('/yunmu/api/animal/detail', {
    method: 'POST',
    data: params,
  });
}

export async function getAnimalList(params) {
  return request('/yunmu/api/animal/findPageInfo', {
    method: 'POST',
    data: params,
  });
}

export async function exportAnimal(params) {
  return request('/yunmu/api/animal/export', {
    method: 'POST',
    data: params,
  });
} 



