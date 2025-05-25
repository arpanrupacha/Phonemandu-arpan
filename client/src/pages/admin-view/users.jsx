import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, addUser, editUser, deleteUser } from "@/store/admin/users-slice";
import { Button } from "@/components/ui/button";

function AdminUsers() {
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.adminUsers);
  const [formData, setFormData] = useState({ userName: "", email: "", password: "", role: "user" });
  const [editId, setEditId] = useState(null);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  function isValidPassword(password) {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(password);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!editId || (editId && formData.password)) {
      if (!isValidPassword(formData.password)) {
        setPasswordError(
          "Password must be at least 8 characters, include one uppercase letter, one number, and one special character."
        );
        return;
      }
    }
    setPasswordError("");

    if (editId) {
      dispatch(editUser({ id: editId, ...formData })).then(() => {
        setEditId(null);
        setFormData({ userName: "", email: "", password: "", role: "user" });
        dispatch(fetchAllUsers());
      });
    } else {
      dispatch(addUser(formData)).then(() => {
        setFormData({ userName: "", email: "", password: "", role: "user" });
        dispatch(fetchAllUsers());
      });
    }
  }

  function handleEdit(user) {
    setEditId(user._id);
    setFormData({ userName: user.userName, email: user.email, password: "", role: user.role });
  }

  function handleDelete(id) {
    dispatch(deleteUser(id)).then(() => dispatch(fetchAllUsers()));
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4 w-full md:w-1/3"
        >
          <input
            className="border rounded px-3 py-2"
            value={formData.userName}
            onChange={e => setFormData({ ...formData, userName: e.target.value })}
            placeholder="User Name"
            required
          />
          <input
            className="border rounded px-3 py-2"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email"
            required
          />
          <input
            className="border rounded px-3 py-2"
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
            placeholder="Password"
            type="password"
            required={!editId}
          />
          {passwordError && (
            <span className="text-red-500 text-sm">{passwordError}</span>
          )}
          <select
            className="border rounded px-3 py-2"
            value={formData.role}
            onChange={e => setFormData({ ...formData, role: e.target.value })}
            disabled={formData.role === "admin" && editId !== null} // Disable if editing admin
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <Button type="submit" className="w-full">
            {editId ? "Update" : "Add"} User
          </Button>
        </form>

        {/* Table Section */}
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Role</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userList.map(user => (
                <tr key={user._id} className="border-t">
                  <td className="py-2 px-4">{user._id}</td>
                  <td className="py-2 px-4">{user.userName}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4 capitalize">{user.role}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;