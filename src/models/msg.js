import { getMsgList, read, batchRead } from '@/services/msg';

const Model = {
  namespace: 'msg',
  state: {
    unreadCount: 0,
    msgList: []
  },
  effects: {
    * getMsgInfo({ payload = { pageSize: 10, pageNum: 1 }}, { call, put }) {
      const response = yield call(getMsgList, payload);
      let { data = {} } = response;
      data = data || {};
      const { msgList = [], unreadCount = 0 } = data;
      yield put({
        type: 'setState',
        payload: {
          msgList,
          unreadCount
        }
      });
    },
    * read({ payload }, { call, put }) {
      const response = yield call(read, payload);
      let { data = {} } = response;
      data = data || {};
      const { code = 0 } = data;
      if (code == 0) {
        yield put({
          type: 'getMsgInfo',
        });
      }
    },
  },
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload}
    }
  },
};
export default Model;
