import { ADD_CUSTOMER, ADD_OFFICE, ADD_SUBJECT, ADD_CONTACT } from "../constants/action-types";


export function addCustomer(payload) {
  return { type: ADD_CUSTOMER, payload };
}

export function addOffice(payload) {
  return { type: ADD_OFFICE, payload };
}

export function addSubject(payload) {
  return { type: ADD_SUBJECT, payload };
}

export function addContact(payload) {
  return { type: ADD_CONTACT, payload };
}

export function getOffices() {
  return { type: "OFFICES_REQUESTED" };
}

export function getSubjects() {
  return { type: "SUBJECTS_REQUESTED" };
}

export function getSubjectCategories() {
  return { type: "SUBJECT_CATEGORIES_REQUESTED" };
}

export function getCustomers() {
  return { type: "CUSTOMERS_REQUESTED" };
}

export function getContacts() {
  return { type: "CONTACTS_REQUESTED" };
}

export function getAppointments() {
  return { type: "APPOINTMENTS_REQUESTED" };
}