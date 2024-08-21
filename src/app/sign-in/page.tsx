"use client";
import { useUser } from "@/context/UserContext";
import { GoogleLogin } from "@react-oauth/google";
import type { CheckboxProps } from "antd";
import { Button, Checkbox, Col, Row, message } from "antd";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormFields = {
  username: string;
  password: string;
};

type DecodedToken = {
  name: string;
};
const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();
  const router = useRouter();
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
      // Showing toast message
      const hideLoadingMessage = message.loading("Logging...", 0);
      // Simulate a delay for 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));
      hideLoadingMessage();
      message.success("Login successful!");

      // set user in context
      setUser({
        fullname: formData.username,
        loggedin: true,
      });

      // Storing the data in localstorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: formData.username,
          loggedin: true,
        })
      );
      router.push("/");
    } catch (error) {
      message.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = (credentials: any) => {
    const decodedValue = jwtDecode<DecodedToken>(credentials.credential);
    // set user in context
    setUser({
      fullname: decodedValue.name,
      loggedin: true,
    });
    // Storing the data in localstorage
    localStorage.setItem(
      "user",
      JSON.stringify({
        fullname: decodedValue.name,
        loggedin: true,
      })
    );
    router.push("/");
  };

  const handleError = () => {};

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
              User Name *
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
              Password *
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
          <div style={{ marginBottom: "1rem", textAlign: "center" }}>
            <Button
              disabled={loading}
              type="primary"
              block
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
          <div
            style={{
              marginBottom: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <p style={{ textAlign: "center", marginBottom: ".8rem" }}>or</p>
            <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
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

export default SignIn;
