import Axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Actions as actions } from './index';

const apiCall = async () => {
  const url = 'https://cat-fact.herokuapp.com/facts/random';
  return await Axios.get(url);
};

export function* fetchCatFactSaga() {
  try {
    const response = yield call(() => apiCall());
    yield put(actions.loadCatFactSuccess(response.data.text));
  } catch (error) {
    yield put(actions.loadCatFactFailed(error));
  }
}

export function* Saga() {
  yield takeLatest(actions.loadCatFact.type, fetchCatFactSaga);
}
