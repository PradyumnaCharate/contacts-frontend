import React, { useEffect, useReducer, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getError } from "../utils";
import { toast, ToastContainer } from "react-toastify";
import {
  Modal,
  Form,
  Button,
  Container,
  Row,
  Col,
  ProgressBar,
} from "react-bootstrap";
import axios from "axios";
import LoadingBox from "./LoadingBox";


const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};

export default function EditContact(props) {
 
  
  const params = useParams(); // /product/:id
  const { id } = params;
  const [name, setName] = useState("");
  
  //const [list_of_phones, setList] = useState([]);
  const [phone, setPhone] = useState("");
  
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  const navigate = useNavigate();
  
  const resetForm = () => {
    setName("");
    
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });

        const { data } = await axios.get(
          `https://contact-backend-production-a4ba.up.railway.app/api/contacts/${id}`,
          
        );
        // console.log(data);
        const contact = data;
        setName(contact.name);
        props.phone===true?setName(contact.phones.find((phone)=>phone._id===props.id)):setPhone("")
        
        
     
        
        dispatch({ type: "FETCH_SUCCESS" });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
        toast.error(getError(error), {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    };
    fetchData();
  }, [id, props.show]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
       let body={}
      props.phone?body={phoneId:props.id,phone:phone}:body={name:name}
      dispatch({ type: "UPDATE_REQUEST" });
      const { data } = await axios.put(
        `https://contact-backend-production-a4ba.up.railway.app/api/contacts/${id}`,
        body
        
      );

      if (data) {
        toast.success("Contact Edited Succesfully. Redirecting...", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        resetForm();
        setTimeout(() => {
          
             navigate("/");
        }, 3000);
        dispatch({ type: "UPDATE_SUCCESS" });
      } else {
        toast.error(data.error.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL" });
      toast.error(getError(err), {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

 

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Contact
        </Modal.Title>
      </Modal.Header>
      {
        props.phone===true?(<Modal.Body>
          <Container
            className="small-container"
            style={{ backgroundColor: "#f4f6f9" }}
          >
          

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>
            
            
            
            
            <ToastContainer />
          </Container>
        </Modal.Body>):(<Modal.Body>
          <Container
            className="small-container"
            style={{ backgroundColor: "#f4f6f9" }}
          >
          

            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            
            
            
            
            <ToastContainer />
          </Container>
        </Modal.Body>)
      }
      <Form onSubmit={submitHandler}>
        
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>
            Close
          </Button>
          <Button
            variant="success"
            type="submit"
            disabled={loadingUpdate ? true : false}
          >
            Submit
          </Button>
          {loadingUpdate && <LoadingBox></LoadingBox>}
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
