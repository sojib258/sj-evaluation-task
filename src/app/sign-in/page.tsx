"use client";
import type { CheckboxProps } from "antd";
import { Button, Checkbox, Col, Row, message } from "antd";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormFields = {
  username: string;
  password: string;
};
const page = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const handleLogin: SubmitHandler<FormFields> = async (
    formData: FormFields
  ) => {
    try {
      setLoading(true);
      message.success(
        `You Username: ${formData.username} & Your Password: ${formData.password}`
      );
    } catch (error) {
      message.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row className="min-h-[calc(100vh-14vh)]">
      <Col className="m-auto" span={16}>
        <h2
          style={{
            fontWeight: "bold",
            fontSize: "2.5rem",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          Sing In
        </h2>
        <form style={{ width: "400px", margin: "0px auto" }} action="">
          <div className="mb-4">
            <label
              style={{
                display: "block",
                fontSize: ".875rem",
                marginBottom: ".35rem",
              }}
              htmlFor="username"
            >
              User Name
            </label>
            <input
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 5,
                  message: "Username must min length 5",
                },
              })}
              style={{
                width: "100%",
                height: "auto",
                border: "1px solid #1F2937",
                borderRadius: "8px",
                padding: "10px",
              }}
              id="username"
              type="text"
              name="username"
              placeholder="Username..."
            />
            {errors.username && (
              <p style={{ color: "red" }}>{errors.username.message}</p>
            )}
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                fontSize: ".875rem",
                marginBottom: ".35rem",
              }}
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must min length 8",
                },
              })}
              style={{
                width: "100%",
                height: "auto",
                border: "1px solid #1F2937",
                borderRadius: "8px",
                padding: "10px",
              }}
              id="password"
              type="password"
              name="password"
              placeholder="Password..."
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password.message}</p>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <Checkbox style={{ fontSize: "1rem" }} onChange={onChange}>
              Remember me
            </Checkbox>
            <Button style={{ color: "#4096FF", fontSize: "1rem" }} type="text">
              forgot password?
            </Button>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <Button
              disabled={loading}
              type="primary"
              style={{
                fontWeight: "bold",
                minWidth: "100px",
                padding: "18px 20px",
              }}
              onClick={handleSubmit(handleLogin)}
            >
              Log In
            </Button>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <p style={{ textAlign: "center" }}>or sign in with</p>
          </div>
          <div>
            <p style={{ textAlign: "center" }}>
              Do not have an account? <Link href="/sign-up">Sign Up</Link>
            </p>
          </div>
        </form>
      </Col>
    </Row>
  );
};

export default page;
