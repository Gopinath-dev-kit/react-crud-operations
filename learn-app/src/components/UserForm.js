import React from "react";

function UserForm({ name, setName, email, setEmail, handleSubmit, editId }) {
  return (
    <div>
      <h3>{editId ? "Update User" : "Add User"}</h3>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {editId ? "Update" : "Add"}
      </button>
    </div>
  );
}

export default UserForm;
