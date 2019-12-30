import {ADD_CONTACT, ADD_CUSTOMER, ADD_OFFICE, ADD_SUBJECT} from "../constants/action-types";
const initialState = {
  officeSidebar: {
    id: null,
    name: null,
  },
  office: {
    id: null,
    name: null,
  },
  subject: {
    id: null,
    name: null,
  },
  contact: {
    id: null,
    name: null,
  },
  offices: [],
  remoteOffices: [],
  appointments: [],
  remoteAppointments: [],
  events: [],
  subjects: [],
  remoteSubjects: [],
  subjectCategories: [],
  remoteSubjectCategories: [],
  customer: {
    id: null,
    first_name: null,
    last_name: null
  },
  customers: [],
  remoteCustomers: [],
  contacts: [],
  remoteContacts: []
};
function rootReducer(state = initialState, action) {
  if (action.type === ADD_CUSTOMER) {
    return Object.assign({}, state, {
      customer: {
        id: action.payload.id,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name
      }
    });
  }
  if (action.type === ADD_OFFICE) {
    return Object.assign({}, state, {
      office: {
        id: action.payload.id,
        name: action.payload.name
      }
    });
  }
  if (action.type === ADD_SUBJECT) {
    return Object.assign({}, state, {
      subject: {
        id: action.payload.id,
        name: action.payload.name
      }
    });
  }
  if (action.type === ADD_CONTACT) {
    return Object.assign({}, state, {
      contact: {
        id: action.payload.id,
        name: action.payload.user.name
      }
    });
  }
  if (action.type === "OFFICES_LOADED") {
    return Object.assign({}, state, {
      remoteOffices: action.payload,
      officeSidebar: action.payload.data[0]
    });
  }
  if (action.type === "SUBJECTS_LOADED") {
    return Object.assign({}, state, {
      remoteSubjects: action.payload
    });
  }
  if (action.type === "SUBJECT_CATEGORIES_LOADED") {
    return Object.assign({}, state, {
      remoteSubjectCategories: action.payload
    });
  }
  if (action.type === "CUSTOMERS_LOADED") {
    return Object.assign({}, state, {
      remoteCustomers: action.payload
    });
  }
  if (action.type === "CONTACTS_LOADED") {
    return Object.assign({}, state, {
      remoteContacts: action.payload
    });
  }
  if (action.type === "CONTACTS_LOADED") {
    return Object.assign({}, state, {
      remoteContacts: action.payload
    });
  }
  if (action.type === "APPOINTMENTS_LOADED") {
    console.log(action.payload);
    let events = []
    action.payload.data.forEach(function (appointment) {
      events.push({
        title: appointment.subject.name + '\n' + appointment.customer.first_name + ' ' + appointment.customer.last_name,
        start: new Date(appointment.start),
        end: new Date(appointment.end)
      })
    });

    return Object.assign({}, state, {
      remoteAppointments: action.payload,
      events: events
    });
  }
  return state;
}
export default rootReducer;