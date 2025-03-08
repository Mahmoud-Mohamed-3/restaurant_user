import "../css/register.css";
import { Form, Input, message } from "antd";
import FormItem from "antd/es/form/FormItem/index.js";
import Password from "antd/es/input/Password.js";
import { Register } from "../API Calls/Regestrations/RegisterAPi.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Use useHistory for navigation
import { useCookies } from "react-cookie";

export default function RegisterPage() {
  const [form] = Form.useForm();
  const [cookies] = useCookies([]);
  useEffect(() => {
    if (cookies.jwt) {
      window.location.href = "/";
    }
  }, []);
  useEffect(() => {
    const savedValues = localStorage.getItem("registerFormData");
    if (savedValues) {
      form.setFieldsValue(JSON.parse(savedValues));
    }
  }, [form]);

  const handleFormChange = (_, allValues) => {
    localStorage.setItem("registerFormData", JSON.stringify(allValues));
  };

  // Clear form data from localStorage on successful registration
  const onFinish = async (values) => {
    try {
      const result = await Register(values);

      if (result.status === 200) {
        message.success("Registration successful");
        localStorage.removeItem("registerFormData"); // Clear saved values
        form.resetFields();
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else if (result.status === 422) {
        message.error(result.message);
        localStorage.removeItem("registerFormData"); // Clear saved values
        form.resetFields();
      } else {
        message.error("An unexpected error occurred");
        localStorage.removeItem("registerFormData"); // Clear saved values
        form.resetFields();
      }
    } catch (error) {
      message.error("An unexpected error occurred");
      localStorage.removeItem("registerFormData"); // Clear saved values
      form.resetFields();
    }
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem("registerFormData");
    };
  }, []);

  useEffect(() => {
    document.body.classList.add("RegisterPage");

    return () => {
      document.body.classList.remove("RegisterPage");
    };
  }, []);

  return (
    <>
      <h1 className="ResName">FEANE</h1>
      <div className="Register">
        <h1>Register</h1>
        <Form
          layout="vertical"
          className="RegisterForm"
          form={form}
          onFinish={onFinish}
          onValuesChange={handleFormChange}
        >
          <div className="NameInputs">
            <FormItem
              label="First Name"
              name="first_name"
              rules={[
                { required: true, message: "Please input your first name!" },
                {
                  pattern: /^[a-zA-Z]+$/,
                  message: "First name must be alphabetic",
                },
                { min: 2, message: "First name must be at least 2 characters" },
                {
                  max: 20,
                  message: "First name must be at most 20 characters",
                },
              ]}
            >
              <Input placeholder="First Name" />
            </FormItem>
            <FormItem
              label="Last Name"
              name="last_name"
              rules={[
                { required: true, message: "Please input your last name!" },
                {
                  pattern: /^[a-zA-Z]+$/,
                  message: "Last name must be alphabetic",
                },
                { min: 2, message: "Last name must be at least 2 characters" },
                { max: 20, message: "Last name must be at most 20 characters" },
              ]}
            >
              <Input placeholder="Last Name" />
            </FormItem>
          </div>
          <FormItem
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input placeholder="Email" type="email" />
          </FormItem>
          <FormItem
            label="Phone"
            name="phone_number"
            rules={[
              { required: true, message: "Please input your phone number!" },
              {
                pattern: /^01[0-9]{9}$/,
                message: "Phone number must be 11 digits and start with 01",
              },
            ]}
          >
            <Input placeholder="Phone" type="tel" />
          </FormItem>
          <FormItem
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 8, message: "Password must be at least 8 characters" },
            ]}
          >
            <Password placeholder="Password" type="password" />
          </FormItem>

          <button className="RegisterButton" type="submit">
            Register
          </button>
        </Form>
        <Link to={"/login"}>Already have an account? Login</Link>
      </div>
    </>
  );
}
