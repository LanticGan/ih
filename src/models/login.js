import { stringify } from 'querystring';
import { history } from 'umi';
import { fakeAccountLogin, accountLogin, phoneLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
    isLogin: false,
    messaage: null,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const { userName: account, password, type, phone, smsCode } = payload;
      let response = {};
      if (type == 'mobile') {
        response = yield call(phoneLogin, {phone, smsCode});
      } else {
        response = yield call(accountLogin, {account, password});
      }

      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: response.code,
          message: response.message
        }
      });

      if (response.code == 0) {
        yield put({
          type: 'setLogin',
          payload: {
            isLogin: true
          },
        });

        sessionStorage.setItem('isLogin', true);

        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        history.replace(redirect || '/');
      }
    },

    *logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      
      yield put({
        type: 'setLogin',
        payload: {
          isLogin: false
        },
      });

      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    setLogin(state, { payload }) {
      const { isLogin = true } = payload
      return { ...state, isLogin };
    },
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
  },
};
export default Model;
