import request from '@/utils/request';

export async function createVaccine(params) {
  return request('/yunmu/api/vaccine/create', {
    method: 'POST',
    data: params,
  });
}

export async function getVaccineList(params) {
  return request('/yunmu/api/vaccine/findPageInfo', {
    method: 'POST',
    data: params,
  });
}

