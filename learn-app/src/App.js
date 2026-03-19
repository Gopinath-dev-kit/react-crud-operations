import React, { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import { getUsers, createUser, updateUser, deleteUser } from "./services/api";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  const handleSubmit = async () => {
    if (!name || !email) return alert("Please fill all fields");

    if (editId) {
      const res = await updateUser(editId, { name, email });

      setUsers(users.map((u) => (u.id === editId ? res.data : u)));
      setEditId(null);
    } else {
      const res = await createUser({ name, email });
      setUsers([...users, res.data]);
    }

    setName("");
    setEmail("");
  };

  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setEditId(user.id);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>React CRUD App</h2>

      <UserForm
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
        editId={editId}
      />

      <UserList
        users={users}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
