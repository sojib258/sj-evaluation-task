"use client";
import { useUser } from "@/context/UserContext";
import type { CheckboxProps } from "antd";
import { Button, Col, Row, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormFields = {
  fullname: string;
  email: string;
  zipcode: number;
  password: string;
  confirmPassword: string;
};
const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormFields>();

  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const handleRegister: SubmitHandler<FormFields> = async (
    formData: FormFields
  ) => {
    if (formData.password === formData.confirmPassword) {
      try {
        setLoading(true);
        // Showing toast message
        const hideLoadingMessage = message.loading("Registering...", 0);
        // Simulate a delay for 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));
        hideLoadingMessage();
        message.success("Registration successful!");

        // set user in context api
        setUser({
          fullname: formData.fullname,
          loggedin: true,
        });

        // Storing the data in localstorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            fullname: formData.fullname,
            loggedin: true,
          })
        );
        router.push("/");
      } catch (error) {
        message.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    } else {
      setError("confirmPassword", {
        message: "confirm password did not matched",
      });
    }
  };

  return (
    <Row className="min-h-[calc(100vh-14vh)]">
      <Col className="m-auto py-8" span={16}>
        <h2
          style={{
            fontWeight: "bold",
            fontSize: "2.5rem",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          Sing Up
        </h2>
        <form style={{ width: "480px", margin: "0px auto" }} action="">
          {/* full name field */}
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                fontSize: ".875rem",
                marginBottom: ".35rem",
              }}
              htmlFor="fullname"
            >
              Full Name *
            </label>
            <input
              {...register("fullname", {
                required: "full name is required",
                minLength: {
                  value: 4,
                  message: "full name must min length 4",
                },
              })}
              style={{
                width: "100%",
                height: "auto",
                border: "1px solid #1F2937",
                borderRadius: "8px",
                padding: "10px",
              }}
              id="fullname"
              type="text"
              name="fullname"
              placeholder="Fullname..."
            />
            {errors.fullname && (
              <p style={{ color: "red" }}>{errors.fullname.message}</p>
            )}
          </div>

          {/* Email field */}
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                fontSize: ".875rem",
                marginBottom: ".35rem",
              }}
              htmlFor="email"
            >
              Email *
            </label>
            <input
              {...register("email", {
                required: "email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
              style={{
                width: "100%",
                height: "auto",
                border: "1px solid #1F2937",
                borderRadius: "8px",
                padding: "10px",
              }}
              id="email"
              type="email"
              name="email"
              placeholder="Email..."
            />
            {errors.email && (
              <p style={{ color: "red" }}>{errors.email.message}</p>
            )}
          </div>

          {/* Zip Code Field */}

          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                fontSize: ".875rem",
                marginBottom: ".35rem",
              }}
              htmlFor="zipcode"
            >
              Zip Code *
            </label>
            <input
              {...register("zipcode", {
                required: "zipcode is required",
                minLength: {
                  value: 4,
                  message: "zip code min length 4",
                },
              })}
              style={{
                width: "100%",
                height: "auto",
                border: "1px solid #1F2937",
                borderRadius: "8px",
                padding: "10px",
              }}
              id="zipcode"
              type="number"
              name="zipcode"
              placeholder="Zip Code..."
            />
            {errors.zipcode && (
              <p style={{ color: "red" }}>{errors.zipcode.message}</p>
            )}
          </div>

          {/* Password field */}
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

          {/* Confirm Password Field */}
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                fontSize: ".875rem",
                marginBottom: ".35rem",
              }}
              htmlFor="confirmPassword"
            >
              Confirm Password *
            </label>
            <input
              {...register("confirmPassword", {
                required: "Confirm password is required",
                minLength: {
                  value: 8,
                  message: "Confirm password must min length 8",
                },
              })}
              style={{
                width: "100%",
                height: "auto",
                border: "1px solid #1F2937",
                borderRadius: "8px",
                padding: "10px",
              }}
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password..."
            />
            {errors.confirmPassword && (
              <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
            )}
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
              onClick={handleSubmit(handleRegister)}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </div>
          <div>
            <p style={{ textAlign: "center" }}>
              Already have an account? <Link href="/sign-in">Sign In</Link>
            </p>
          </div>
        </form>
      </Col>
    </Row>
  );
};

export default SignUp;
