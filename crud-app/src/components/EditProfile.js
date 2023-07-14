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
} from "firebase/auth";

const EditProfile = (props) => {
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
    const userData = {
      Firstname: firstName,
      Lastname: lastName,
      Email: email,
      Password: password,
      Address: address,
      Age: age,
      Gender: gender,
      States: states,
      Zip: zip,
    };
    //-----------------------------------------------------------------------------

    const currentPassword = prompt("Please enter your current password:");

    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    await reauthenticateWithCredential(user, credential)
      .then(() => {
        updateEmail(auth.currentUser, userData.Email)
          .then(() => {
            console.log("email updated");
          })
          .catch((error) => {
            console.log(error);
          });

        updatePassword(auth.currentUser, userData.Password)
          .then(() => {
            console.log("pasowrd updated");
          })
          .catch((error) => {
            console.log(error);
          });

        // --------------------------------------------------------------------
        update(ref(db, "RegUser/" + id), userData)
          .then((response) => {
            alert(" detailes updated Successfuly");
          })
          .catch((err) => {
            alert("Encounted an error" + err);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   -------------------------------------------------------------------------
  //   const handleDelete = async (e) => {
  //     e.preventDefault();
  //     window.confirm("Are you sure, you want to Delete Account");
  //     if (window.confirm) {
  //       const user = auth.currentUser;

  //       await deleteUser(user)
  //         .then(() => {
  //           console.log("Account deleted");
  //         })
  //         .catch((error) => {
  //           console.log(error.message);
  //         });

  //      await update(ref(db, "RegUser/" + id))
  //         .then((response) => {
  //           alert(" Account Deleted successfully");
  //         })
  //         .catch((err) => {
  //           alert("Encounted an error" + err);
  //         });
  //     }
  //   };
  const handleDelete = async (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (confirmDelete) {
      try {
        const user = auth.currentUser;

        if (user) {
          // Delete the user account from Firebase Authentication
          await user.delete();

          // Delete the user data from the Realtime Database
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
          navigate("/", { replace: true });
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        console.log(error.message);
        alert("An error occurred while deleting the account");
      }
    }
  };

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
            <Row>
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
            </Row>
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

export default EditProfile;
