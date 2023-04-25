import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

import { toast, ToastContainer } from "react-toastify";
import { useContext, useState } from "react";

import { Col, Container, Row, ProgressBar } from "react-bootstrap";
import LoadingBox from "./LoadingBox";
import { getError } from "../utils";


export default function AddContact() {


  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  
  const navigate = useNavigate();
  
  const resetForm = () => {
    setName("");
    setPhone("");
   
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
      setLoadingUpdate(true);
      // console.log("longitude", longitude);

      const { data } = await axios.post(
        "https://contact-backend-production-a4ba.up.railway.app/api/contacts/addContact",
        {
          name: name,
          phone: phone,
       
        },
      
      );

      if (data.name) {
        toast.success("Contact Added Succesfully", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        resetForm();
        setTimeout(() => {
         
          navigate("/")
         
        }, 3000);

        setLoadingUpdate(false);
      } else {
        toast.error(data.error.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setLoadingUpdate(false);
      }
    } catch (err) {
      setLoadingUpdate(false);
      toast.error(getError(err), {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

 

  return (
    <Container fluid className="mb-3">
      {/* Content Header (Page header) */}
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1>Add Contact</h1>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>

      {/* Main content */}
      <section class="content">
        <div class="container-fluid">
          <div class="row">
            {/* left column */}
            <div class="col-md-12">
              {/* jquery validation */}
              <div class="card card-primary">
                <div class="card-header">
                  <h3 class="card-title">Add Details</h3>
                </div>
                {/* /.card-header */}
                {/* form start */}
                <Form onSubmit={submitHandler}>
                  <div className="card-body">
                    <Form.Group className="mb-3" controlId="name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="no">
                      <Form.Label>Phone No</Form.Label>
                      <Form.Control
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </Form.Group>
                    
                
                    

                  </div>
                  {/* /.card-body */}
                  <div class="card-footer">
                    <Button
                      type="submit"
                      disabled={loadingUpdate ? true : false}
                    >
                      Submit
                    </Button>
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                  </div>
                </Form>
                <ToastContainer />
              </div>
              {/* /.card */}
            </div>
            <div class="col-md-6"></div>
            {/*/}.col (left) */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </Container>
  );
}
