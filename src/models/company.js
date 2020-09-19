import { stringify } from 'querystring';
import { createCompany, findPageInfo, getDetail } from '@/services/company';
import { getPageQuery } from '@/utils/utils';

const Model = {
  namespace: 'company',
  state: {
    companyList: [],
    companyDetail: {}
  },
  effects: {
    *findPageInfo({ payload }, { call, put }) {
      const response = yield call(findPageInfo, payload);
      const { data = {} } = response;
      const { list = [] } = data;
      yield put({
        type: 'setState',
        payload: {
          companyList: list
        }
      });
    },

    *getCompanyDetail({ payload }, { call, put }) {
      const response = yield call(getDetail, payload);
      const { data = {} } = response;
      yield put({
        type: 'setState',
        payload: {
          companyDetail: data
        }
      });
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
    setState(state, { payload }) {
      return { ...state, ...payload}
    }
  },
};
export default Model;
