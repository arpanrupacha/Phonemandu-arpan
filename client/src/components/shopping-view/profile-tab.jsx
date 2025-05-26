import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, changePassword, setUser } from "@/store/auth-slice";
import { useToast } from "@/components/ui/use-toast";

function ProfileTab() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  const [profileData, setProfileData] = useState({
    userName: user?.userName || "",
    email: user?.email || "",
  });
  const [profileEdit, setProfileEdit] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  function isValidPassword(password) {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(password);
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ userName: profileData.userName, email: profileData.email })).then((res) => {
      if (res?.payload?.success) {
        toast({ title: "Profile updated!" });
        dispatch(setUser({ userName: profileData.userName }));
        setProfileEdit(false);
      } else {
        toast({ title: res?.payload?.message || "Update failed", variant: "destructive" });
      }
    });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!isValidPassword(passwordData.newPassword)) {
      setPasswordError("Password must be at least 8 characters, include one uppercase letter, one number, and one special character.");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    setPasswordError("");
    dispatch(changePassword(passwordData)).then((res) => {
      if (res?.payload?.success) {
        toast({ title: "Password changed successfully!" });
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        toast({ title: res?.payload?.message || "Password change failed", variant: "destructive" });
      }
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Profile Info */}
      <div className="flex-1 bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              className="w-full border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
              value={profileData.userName}
              onChange={e => setProfileData({ ...profileData, userName: e.target.value })}
              disabled={!profileEdit}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
              value={profileData.email}
              disabled
              readOnly
              type="email"
            />
          </div>
          {!profileEdit ? (
            <button type="button" className="text-primary font-semibold hover:underline" onClick={() => setProfileEdit(true)}>
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition">Save</button>
              <button type="button" className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition" onClick={() => setProfileEdit(false)}>
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
      {/* Password Change */}
      <div className="flex-1 bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Change Password</h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Current Password</label>
            <input
              className="w-full border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
              type="password"
              value={passwordData.currentPassword}
              onChange={e => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input
              className="w-full border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
              type="password"
              value={passwordData.newPassword}
              onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirm New Password</label>
            <input
              className="w-full border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
              type="password"
              value={passwordData.confirmPassword}
              onChange={e => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              required
            />
          </div>
          {passwordError && <div className="text-red-500 text-sm">{passwordError}</div>}
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileTab;