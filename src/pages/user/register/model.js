import { register, sendSms } from './service';

const Model = {
  namespace: 'userAndregister',
  state: {
    status: undefined,
    code: null,
    message: "",
  },
  effects: {
    *submit({ payload }, { call, put }) {
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
      return { ...state, code: payload.code, message: payload.message };
    },
    reset(state, { payload }) {
      return {
        ...state,
        status: null
      }
    }
  },
};
export default Model;
