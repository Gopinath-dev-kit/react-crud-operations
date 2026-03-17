import React, { useState } from "react";

const App = () => {

  // -----------------------------
  // 1. State to store all users
  // -----------------------------
  const [users, setUsers] = useState([]);

  // -----------------------------
  // 2. State to store form input values
  // -----------------------------
  const [userInfo, setUserInfo] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    address: "",
  });

  // -----------------------------
  // 3. State to track edit mode
  // If null -> Add mode
  // If index -> Edit mode
  // -----------------------------
  const [editIndex, setEditIndex] = useState(null);

  // -----------------------------
  // 4. Handle input field changes
  // Updates the userInfo state dynamically
  // -----------------------------
  const handlechange = (e) => {
    const { name, value } = e.target;

    setUserInfo((currInfo) => ({
      ...currInfo,
      [name]: value,
    }));
  };

  // -----------------------------
  // 5. Edit user data
  // Loads selected row data into form
  // -----------------------------
  const handleEdit = (index) => {
    setUserInfo(users[index]); // fill form with selected user
    setEditIndex(index); // set edit mode
  };

  // -----------------------------
  // 6. Add or Update user data
  // -----------------------------
  const addData = () => {

    // Update existing user
    if (editIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editIndex] = userInfo;
      setUsers(updatedUsers);
      setEditIndex(null); // exit edit mode
    }

    // Add new user
    else {
      setUsers([...users, userInfo]);
    }

    // Reset form fields
    setUserInfo({
      name: "",
      age: "",
      email: "",
      phone: "",
      address: ""
    });
  };

  // -----------------------------
  // 7. Delete user from table
  // -----------------------------
  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  return (
    <div className="form-container">

      {/* -----------------------------
          8. User Form Section
      ----------------------------- */}
      <div className="form-outer">
        <h2>User Form</h2>

        <input
          type="text"
          placeholder="Name"
          value={userInfo.name}
          name="name"
          onChange={handlechange}
        />

        <input
          type="number"
          placeholder="Age"
          value={userInfo.age}
          name="age"
          onChange={handlechange}
        />

        <input
          type="email"
          placeholder="Email"
          value={userInfo.email}
          name="email"
          onChange={handlechange}
        />

        <input
          type="tel"
          placeholder="Phone"
          value={userInfo.phone}
          name="phone"
          onChange={handlechange}
        />

        <textarea
          placeholder="Address"
          value={userInfo.address}
          name="address"
          onChange={handlechange}
        ></textarea>

        {/* Button text changes based on edit mode */}
        <button onClick={addData}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      {/* -----------------------------
          9. Data Table Section
      ----------------------------- */}
      <div className="datatable">
        <h2>Data Table</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={index}>

                {/* Display user data */}
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>

                {/* Action buttons */}
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
export default App;