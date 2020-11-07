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
    method: 'GET',
    data: params,
  });
}

export async function statisticDaily(params) {
  return request('/yunmu/api/animal/statisticDaily', {
    method: 'POST',
    data: params,
  });
}

export async function deleteAnimal(params) {
  return request('/yunmu/api/animal/delete', {
    method: 'POST',
    data: params,
  });
}







