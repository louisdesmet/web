import { takeEvery, call, put } from "redux-saga/effects";

export default function* watcherSaga() {
  yield takeEvery("OFFICES_REQUESTED", officesWorkerSaga);
  yield takeEvery("SUBJECTS_REQUESTED", subjectsWorkerSaga);
  yield takeEvery("SUBJECT_CATEGORIES_REQUESTED", subjectCategoriesWorkerSaga);
  yield takeEvery("CUSTOMERS_REQUESTED", customersWorkerSaga);
  yield takeEvery("CONTACTS_REQUESTED", contactsWorkerSaga);
  yield takeEvery("APPOINTMENTS_REQUESTED", appointmentsWorkerSaga);
  yield takeEvery("OUTCOMES_REQUESTED", outcomesWorkerSaga);
}

function* officesWorkerSaga() {
  try {
    const payload = yield call(getOffices);
    yield put({ type: "OFFICES_LOADED", payload });
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}

function* subjectsWorkerSaga() {
  try {
    const payload = yield call(getSubjects);
    yield put({ type: "SUBJECTS_LOADED", payload });
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}

function* subjectCategoriesWorkerSaga() {
  try {
    const payload = yield call(getSubjectCategories);
    yield put({ type: "SUBJECT_CATEGORIES_LOADED", payload });
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}

function* customersWorkerSaga() {
  try {
    const payload = yield call(getCustomers);
    yield put({ type: "CUSTOMERS_LOADED", payload });
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}

function* contactsWorkerSaga() {
  try {
    const payload = yield call(getContacts);
    yield put({ type: "CONTACTS_LOADED", payload });
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}

function* appointmentsWorkerSaga() {
  try {
    const payload = yield call(getAppointments);
    yield put({ type: "APPOINTMENTS_LOADED", payload });
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}

function* outcomesWorkerSaga() {
    try {
        const payload = yield call(getOutcomes);
        yield put({ type: "OUTCOMES_LOADED", payload });
    } catch (e) {
        yield put({ type: "API_ERRORED", payload: e });
    }
}

function getOffices() {
  return fetch('http://api.test/api/offices', {
    headers: new Headers({
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("tokens")).access_token,
      'Accept': 'application/json'
    })
  }).then(function(response) {
    return response.json();
  });
}

function getSubjects() {
  return fetch('http://api.test/api/subjects', {
    headers: new Headers({
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("tokens")).access_token,
      'Accept': 'application/json'
    })
  }).then(function(response) {
    return response.json();
  });
}

function getSubjectCategories() {
  return fetch('http://api.test/api/subject-categories', {
    headers: new Headers({
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("tokens")).access_token,
      'Accept': 'application/json'
    })
  }).then(function(response) {
    return response.json();
  });
}

function getCustomers() {
  return fetch('http://api.test/api/customers', {
    headers: new Headers({
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("tokens")).access_token,
      'Accept': 'application/json'
    })
  }).then(function(response) {
    return response.json();
  });
}

function getContacts() {
  return fetch('http://api.test/api/contacts', {
    headers: new Headers({
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("tokens")).access_token,
      'Accept': 'application/json'
    })
  }).then(function(response) {
    return response.json();
  });
}

function getAppointments() {
  return fetch('http://api.test/api/appointments', {
    headers: new Headers({
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("tokens")).access_token,
      'Accept': 'application/json'
    })
  }).then(function(response) {
    return response.json();
  });
}

function getOutcomes() {
    return fetch('http://api.test/api/outcomes', {
        headers: new Headers({
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("tokens")).access_token,
            'Accept': 'application/json'
        })
    }).then(function(response) {
        return response.json();
    });
}