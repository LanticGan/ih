import { register, sendSms } from './service';

const Model = {
  namespace: 'userAndregister',
  state: {
    status: undefined,
    code: null,
  },
  effects: {
    *submit({ payload }, { call, put }) {
      console.log('payload', payload);
      const response = yield call(register, payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },

    *sendSms({ payload }, { call, put }) {
      yield call(sendSms, payload);
    },
    
  },
  reducers: {
    registerHandle(state, { payload }) {
      return { ...state, status: payload.status, code: payload.code };
    },
  },
};
export default Model;
