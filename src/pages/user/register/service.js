import request from 'umi-request';

export async function register(params) {
  return request('/yunmu/api/register', {
    method: 'POST',
    data: params,
  });
}

export async function sendSms(params) {
  return request('/yunmu/api/sendSms', {
    method: 'POST',
    data: params,
  });
}
