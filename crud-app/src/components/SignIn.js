import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { auth } from "../config/Config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      alert("User Successfully Log In");
      const id = user.user.uid;
      navigate(`/profile/${id}`);
    } catch (error) {
      console.log(error.message);
      alert(`wrong user credentials : ${error.message}`);
    }
  };

  return (
    <div className="signIn container w-50 mt-4">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">
            <Badge bg="success">Log In</Badge>
          </h2>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-25"
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Form.Label className="ms-5">
              Don't have an user Account?{" "}
              <Link to={"/register"}>
                <span className="login-link ms-2">Register</span>
              </Link>
            </Form.Label>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignIn;
