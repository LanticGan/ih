import request from '@/utils/request';

export async function createVaccine(params) {
  return request('/yunmu/api/vaccine/create', {
    method: 'POST',
    data: params,
  });
}

export async function getMsgList(params) {
  return request('/yunmu/api/msg/findPageInfo', {
    method: 'POST',
    data: params,
  });
}

export async function read(params) {
  return request('/yunmu/api/msg/read', {
    method: 'POST',
    data: params,
  });
}

export async function batchRead(params) {
  return request('/yunmu/api/msg/batchRead', {
    method: 'POST',
    data: params,
  });
}

