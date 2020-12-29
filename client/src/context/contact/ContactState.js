import React, { useReducer } from "react";
import ContactContext from "./contactContext";
import ContactReducer from "./contactReduer";
import nextID from "react-id-generator";
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  CLEAR_FILTER,
  FILTER_CONTACTS,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Gaurav Shinde",
        email: "gshinde18@gmail.com",
        phoneNo: "111-111-222",
        type: "professional",
      },
      {
        id: 2,
        name: "Askhit Madan",
        email: "akmadan18@gmail.com",
        phoneNo: "111-222-222",
        type: "personal",
      },
      {
        id: 3,
        name: "Asif Ansari",
        email: "Aansari18@gmail.com",
        phoneNo: "222-111-222",
        type: "professional",
      },
    ],

    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  //add contacts
  const addContact = (contact) => {
    contact.id = nextID();
    dispatch({
      type: ADD_CONTACT,
      payload: contact,
    });
  };

  //delete contacts

  const deleteContact = (id) => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id,
    });
  };

  //set Current
  const setCurrent = (contact) => {
    dispatch({
      type: SET_CURRENT,
      payload: contact,
    });
  };

  //clear current
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };

  //update contacts
  const updateContact = (contact) => {
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact,
    });
  };

  //filter contacts
  const filterContacts = (text) => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text,
    });
  };

  //clear contacts
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER,
    });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
