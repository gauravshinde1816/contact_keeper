import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, current, clearCurrent, updateContact } = contactContext;
  const [contact, setContact] = useState({
    name: "",
    phoneNo: "",
    type: "personal",
    email: "",
  });
  const { email, phoneNo, type, name } = contact;

  // set current contact in the form
  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        phoneNo: "",
        type: "personal",
        email: "",
      });
    }
  }, [contactContext, current]);

  const onChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const clearAll = () => {
    clearCurrent();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearAll();
    // setContact({
    //   name: "",
    //   phoneNo: "",
    //   type: "personal",
    //   email: "",
    // });
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        {current !== null ? (
          <h2 className="text-primary">Edit contact</h2>
        ) : (
          <h2 className="text-primary">Add contact</h2>
        )}
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Name"
          onChange={onChange}
        />
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Email"
          onChange={onChange}
        />
        <input
          type="text"
          name="phoneNo"
          value={phoneNo}
          placeholder="Phone No."
          onChange={onChange}
        />
        <input
          type="radio"
          name="type"
          value="personal"
          checked={type === "personal"}
          onChange={onChange}
        />
        Personal{" "}
        <input
          type="radio"
          name="type"
          value="professional"
          checked={type == "professional"}
          onChange={onChange}
        />{" "}
        Professional{" "}
        <input
          type="submit"
          value={current !== null ? "Update contact" : "Add contact"}
          className="btn btn-dark btn-block"
        />
        {current && (
          <div>
            <button className="btn btn-light btn-block" onClick={clearAll}>
              Clear
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
