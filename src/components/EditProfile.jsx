import "../css/edit_profile.css";
import { useState, useEffect } from "react";
import { EditProfileApi } from "../API Calls/User/EditProfile.jsx";
import { DeleteAccountApi } from "../API Calls/User/DeleteAccount.jsx";
import { useCookies } from "react-cookie";
import { message, Modal } from "antd";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

export default function EditProfile() {
  const [user, setUser] = useState(null);
  const [cookies] = useCookies();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwords, setPasswords] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const [passwordVisible, setPasswordVisible] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      window.location.reload();
    }
  }, []);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisible({
      ...passwordVisible,
      [field]: !passwordVisible[field],
    });
  };

  const togglePasswordForm = () => {
    setShowPasswordForm(!showPasswordForm);
  };

  const handleUpdateProfile = async () => {
    const response = await EditProfileApi(cookies.jwt, user);
    if (response) {
      sessionStorage.setItem("user", JSON.stringify(user));
      message.success("Profile updated successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      message.error("Failed to update profile");
    }
  };

  const handleUpdatePassword = async () => {
    if (passwords.password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    if (passwords.password !== passwords.password_confirmation) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setPasswordError("");

    const updatedUser = {
      ...user,
      password: passwords.password,
      password_confirmation: passwords.password_confirmation,
      current_password: passwords.current_password,
    };

    const response = await EditProfileApi(cookies.jwt, updatedUser);
    if (response) {
      message.success("Password updated successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      message.error("Failed to update password");
    }
  };

  const handleDeleteAccount = async () => {
    Modal.confirm({
      title: "Are you sure?",
      icon: <ExclamationCircleOutlined />,
      content:
        "This action cannot be undone. Your account will be permanently deleted.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        const response = await DeleteAccountApi(cookies.jwt);
        if (response) {
          message.success("Account deleted successfully.");
          sessionStorage.clear();
          setTimeout(() => {
            window.location.href = "/"; // Redirect to home or login page
          }, 1500);
        } else {
          message.error("Failed to delete account.");
        }
      },
    });
  };

  return (
    <div className="edit-profile-page">
      <div className="page-title">
        <h1>Edit Your Profile</h1>
      </div>
      <div className="user-details">
        {!showPasswordForm ? (
          <>
            <div className="user-field">
              <label htmlFor="first-name">First Name:</label>
              <input
                type="text"
                id="first-name"
                value={user?.first_name || ""}
                onChange={(e) =>
                  setUser({ ...user, first_name: e.target.value })
                }
              />
            </div>
            <div className="user-field">
              <label htmlFor="last-name">Last Name:</label>
              <input
                type="text"
                id="last-name"
                value={user?.last_name || ""}
                onChange={(e) =>
                  setUser({ ...user, last_name: e.target.value })
                }
              />
            </div>
            <div className="user-field">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={user?.email || ""}
                disabled
              />
            </div>
            <div className="user-field">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                value={user?.phone_number || ""}
                disabled
              />
            </div>

            <button
              className="update-profile-button"
              onClick={handleUpdateProfile}
            >
              Update Profile
            </button>

            <div className="link-container">
              <a
                href="#change-password"
                className="change-password-link"
                onClick={togglePasswordForm}
              >
                Need to change password?
              </a>
            </div>
          </>
        ) : (
          <div className="password-change-form">
            <div className="user-field">
              <label htmlFor="current-password">Current Password:</label>
              <div className="password-input-container">
                <input
                  type={passwordVisible.currentPassword ? "text" : "password"}
                  id="current-password"
                  name="current_password"
                  value={passwords.current_password}
                  onChange={handlePasswordChange}
                />
                <span
                  className="password-icon"
                  onClick={() => togglePasswordVisibility("currentPassword")}
                >
                  {passwordVisible.currentPassword ? (
                    <EyeOutlined />
                  ) : (
                    <EyeInvisibleOutlined />
                  )}
                </span>
              </div>
            </div>

            <div className="user-field">
              <label htmlFor="new-password">New Password:</label>
              <div className="password-input-container">
                <input
                  type={passwordVisible.newPassword ? "text" : "password"}
                  id="new-password"
                  name="password"
                  value={passwords.password}
                  onChange={handlePasswordChange}
                />
                <span
                  className="password-icon"
                  onClick={() => togglePasswordVisibility("newPassword")}
                >
                  {passwordVisible.newPassword ? (
                    <EyeOutlined />
                  ) : (
                    <EyeInvisibleOutlined />
                  )}
                </span>
              </div>
            </div>

            <div className="user-field">
              <label htmlFor="confirm-password">Confirm Password:</label>
              <div className="password-input-container">
                <input
                  type={passwordVisible.confirmPassword ? "text" : "password"}
                  id="confirm-password"
                  name="password_confirmation"
                  value={passwords.password_confirmation}
                  onChange={handlePasswordChange}
                />
                <span
                  className="password-icon"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  {passwordVisible.confirmPassword ? (
                    <EyeOutlined />
                  ) : (
                    <EyeInvisibleOutlined />
                  )}
                </span>
              </div>
            </div>

            {passwordError && (
              <div className="error-message">{passwordError}</div>
            )}

            <button
              className="update-profile-button"
              onClick={handleUpdatePassword}
            >
              Update Password
            </button>

            <div className="link-container">
              <a
                href="#back-to-profile"
                className="back-to-profile-link"
                onClick={togglePasswordForm}
              >
                Back to Profile
              </a>
            </div>
          </div>
        )}
      </div>

      {/*<button className="delete-account-button" onClick={handleDeleteAccount}>*/}
      {/*  Delete Account*/}
      {/*</button>*/}
    </div>
  );
}
