import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function accountLogin(params) {
  return request('/yunmu/api/accountLogin', {
    method: 'POST',
    data: params,
  });
}

export async function phoneLogin(params) {
  return request('/yunmu/api/phoneLogin', {
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