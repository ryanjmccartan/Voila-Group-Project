import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postCriteria(action) {
    try{
        axios.post('/api/step3/criteria', action.payload);
        console.log('posting criteria', action.payload);
    }catch (error) {
        console.log('error with posting criteria', error)
    }
}

function* getCriteria(action) {
    try{
        const response = yield axios.get('/api/step3/criteria/' + action.payload)
        console.log('this is user criteria', response.data)
        yield put ({type: 'SET_CRITERIA', payload: response.data});
    }catch (error) {
        console.log('error with getting criteria', error);
    }
}


function* onTheHuntSaga() {
    yield takeLatest('POST_CRITERIA', postCriteria)
    yield takeLatest('GET_CRITERIA', getCriteria)
}

export default onTheHuntSaga;