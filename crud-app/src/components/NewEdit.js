import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { db } from "../config/Config";
import { ref, onValue, update, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/Config";
import {
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
  onAuthStateChanged,
} from "firebase/auth";

const NewEdit = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [states, setStates] = useState("");
  const [zip, setZip] = useState("");
  const navigate = useNavigate();
  let { id } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [getUserData, setGetUserData] = useState([]);

  console.log(getUserData);
  //Getting data -------------------------------------

  useEffect(() => {
    try {
      let userDetails = ref(db, "RegUser/" + id);
      onValue(userDetails, (snapshot) => {
        let data = snapshot.val();

        setGetUserData(data);
      });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    const userData = {};

    if (firstName !== "") {
      userData.Firstname = firstName;
    }

    if (lastName !== "") {
      userData.Lastname = lastName;
    }

    if (email !== "") {
      userData.Email = email;
    }

    // if (password !== "") {
    //   userData.Password = password;
    // }

    if (address !== "") {
      userData.Address = address;
    }

    if (age !== "") {
      userData.Age = age;
    }

    if (gender !== "") {
      userData.Gender = gender;
    }

    if (states !== "") {
      userData.States = states;
    }

    if (zip !== "") {
      userData.Zip = zip;
    }

    const currentPassword = prompt("Please enter your current password:");

    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    try {
      await reauthenticateWithCredential(user, credential);
      updateEmail(auth.currentUser, userData.Email)
        .then(() => {
          console.log("email updated");
        })
        .catch((error) => {
          console.log(error);
        });

      // updatePassword(auth.currentUser, userData.Password)
      //   .then(() => {
      //     console.log("pasowrd updated");
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

      if (Object.keys(userData).length > 0) {
        await update(ref(db, "RegUser/" + id), userData);
        alert("Details updated successfully");
      } else {
        alert("No changes were made");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while updating the details");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (confirmDelete) {
      try {
        const user = auth.currentUser;
        await user.delete();
        // window.location.reload();
        await update(ref(db, "RegUser/" + id), {
          Firstname: null,
          Lastname: null,
          Email: null,
          Password: null,
          Address: null,
          Age: null,
          Gender: null,
          States: null,
          Zip: null,
          Agree: null,
        });

        alert("Account deleted successfully");
        navigate("/");
      } catch (error) {
        console.log(error.message);
        alert("An error occurred while deleting the account");
      }
    }
  };
  if (!getUserData) {
    navigate("/");
    return null;
  }
  return (
    <div className="editProfile">
      <Button variant="primary" onClick={handleShow} placement={"end"}>
        My Profile
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement={"end"}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Edit Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Row>
              <Form.Label column="sm" lg={4}>
                First Name :
              </Form.Label>
              <Col>
                <Form.Control
                  size="md"
                  className="w-55 mb-3"
                  type="text"
                  placeholder="First Name"
                  defaultValue={getUserData.Firstname || ""}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Form.Label column="sm" lg={4}>
                Last Name :
              </Form.Label>
              <Col>
                <Form.Control
                  size="md"
                  className="w-55 mb-3"
                  type="text"
                  placeholder="Last Name"
                  defaultValue={getUserData.Lastname || ""}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Form.Label column="sm" lg={4}>
                Email :
              </Form.Label>
              <Col>
                <Form.Control
                  size="md"
                  className="w-55 mb-3"
                  type="email"
                  placeholder="Email"
                  defaultValue={getUserData.Email || ""}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Col>
            </Row>
            {/* <Row>
              <Form.Label column="sm" lg={4}>
                Password :
              </Form.Label>
              <Col>
                <Form.Control
                  size="md"
                  className="w-55 mb-3"
                  type="password"
                  placeholder="password"
                  defaultValue={getUserData.Password || ""}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Col>
            </Row> */}
            <Row>
              <Form.Label column="sm" lg={4}>
                Gender :
              </Form.Label>
              <Col>
                <Form.Control
                  size="md"
                  className="w-55 mb-3"
                  type="text"
                  placeholder="Gender"
                  defaultValue={getUserData.Gender || ""}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Form.Label column="sm" lg={4}>
                Age :
              </Form.Label>
              <Col>
                <Form.Control
                  size="md"
                  className="w-55 mb-3"
                  type="number"
                  placeholder="Age"
                  defaultValue={getUserData.Age || ""}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Form.Label column="sm" lg={4}>
                Address :
              </Form.Label>
              <Col>
                <Form.Control
                  size="md"
                  className="w-55 mb-3"
                  type="text"
                  placeholder="Address"
                  defaultValue={getUserData.Address || ""}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Form.Label column="sm" lg={4}>
                State :
              </Form.Label>
              <Col>
                <Form.Control
                  size="md"
                  className="w-55 mb-3"
                  type="text"
                  placeholder="State"
                  defaultValue={getUserData.States || ""}
                  onChange={(e) => {
                    setStates(e.target.value);
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Form.Label column="sm" lg={4}>
                Zip code :
              </Form.Label>
              <Col>
                <Form.Control
                  size="md"
                  className="w-55 mb-3"
                  type="text"
                  placeholder="zip code"
                  defaultValue={getUserData.Zip || ""}
                  onChange={(e) => {
                    setZip(e.target.value);
                  }}
                />
              </Col>
            </Row>
            <Button variant="success" type="submit" onClick={handleSave}>
              Save
            </Button>
            <Button
              variant="danger"
              type="submit"
              className="ms-3"
              onClick={handleDelete}
            >
              Delete Account
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default NewEdit;
