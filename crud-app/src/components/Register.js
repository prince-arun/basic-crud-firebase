import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { auth } from "../config/Config";
import { db } from "../config/Config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [states, setStates] = useState("");
  const [zip, setZip] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  let regUser = {
    Firstname: firstName,
    Lastname: lastName,
    Email: email,
    //  Password: password,
    Address: address,
    Age: age,
    Gender: gender,
    States: states,
    Zip: zip,
    Agree: isChecked,
  };

  //Creating Auth information
  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== "" &&
      address !== "" &&
      age !== "" &&
      gender !== "" &&
      states !== "" &&
      zip !== "" &&
      isChecked !== ""
    ) {
      try {
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        ).then((success) => {
          const id = success.user.uid;
          console.log(regUser);
          set(ref(db, "RegUser/" + id), regUser);
          alert("User Created Successfully  ");
          navigate(`/signin/${id}`);
        });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      alert("Please fill all the Details");
    }
  };

  return (
    <div className="register container w-50  w-md-50 w-sm-20 mt-3">
      <Card>
        <Card.Body className="cardBody">
          <h2 className="text-center mb-4">
            <Badge bg="success">Sign Up</Badge>
          </h2>
          <Form className="">
            <Row>
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  placeholder="First name"
                  required
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </Col>
              <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  placeholder="Last name"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
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
            </Row>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control
                placeholder="1234 Main St"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group as={Col}>
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Age"
                    required
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <fieldset>
                  <Form.Group as={Col} className="mb-2">
                    <Form.Label as="legend" column sm={3}>
                      Gender
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Check
                        type="radio"
                        label="Male"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                        checked={gender === "Male"}
                        onChange={() => setGender("Male")}
                      />
                      <Form.Check
                        type="radio"
                        label="Female"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                        checked={gender === "Female"}
                        onChange={() => setGender("Female")}
                      />
                      <Form.Check
                        type="radio"
                        label="Others"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios3"
                        checked={gender === "Others"}
                        onChange={() => setGender("Others")}
                      />
                    </Col>
                  </Form.Group>
                </fieldset>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Select
                  value={states}
                  onChange={(e) => {
                    setStates(e.target.value);
                  }}
                  required
                >
                  <option value="">Choose...</option>
                  <option value="TamilNadu">TamilNadu</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Telungana">Telungana</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kashmir">Kashmir</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Andhaman">Andhaman</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setZip(e.target.value);
                  }}
                  required
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" id="formGridCheckbox">
              <Form.Check
                type="checkbox"
                label="By accessing, you accept the terms and conditions."
                required
                checked={isChecked}
                onChange={(e) => {
                  setIsChecked(e.target.checked);
                }}
              />
            </Form.Group>
            <Button
              variant="primary"
              className="mx-auto w-25"
              type="submit"
              onClick={handleRegister}
            >
              Sign Up
            </Button>
            {"         "}
            <Form.Label className="ms-5">
              Already have a user Account?{" "}
              <Link to={"/signin/:id"}>
                <span className="login-link ms-2">Log In</span>
              </Link>
            </Form.Label>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;
