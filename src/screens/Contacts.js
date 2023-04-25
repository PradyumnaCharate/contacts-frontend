import React, { useContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { getError } from "../utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import MessageBox from "./MessageBox";

import {
  Button,
  Card,
  Container,
  Form,
  InputGroup,
  Table,
} from "react-bootstrap";
import { IoMdOpen } from "react-icons/io";
import ArrayView from "./listView/ArrayView";

import CustomSkeleton from "../components/CustomSkeleton";
import { motion } from "framer-motion";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        contacts: action.payload,
        //shopsCount: action.payload.shopsCount,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function ContactsScreen() {
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [count, setCount] = useState("default");
  const [modalShow, setModalShow] = useState(false);
  const [productList, setProductList] = useState([]);
  const [del, setDel] = useState(false);

  const [{ loading, error, contacts }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      error: "",
    }
  );


  const showModelHandler = (ls) => {
    // console.log("product_list", ls);
    setProductList([...ls]);
    setModalShow(true);
  };

  const deleteContact = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?") === true) {
      try {
        setDel(true);
        const res = await axios.delete(
          `https://contact-backend-production-a4ba.up.railway.app/api/contacts/${id}`,

        );
        setDel(false);
      } catch (error) {
        toast.error(getError(error), {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        let url;
        if(query.length>0){
          url=`https://contact-backend-production-a4ba.up.railway.app/api/contacts/all?starting=${query}`
        }
        else if (count !== "default"){
          url= `https://contact-backend-production-a4ba.up.railway.app/api/contacts/all?count=${count}`
        }
        else{
          url= `https://contact-backend-production-a4ba.up.railway.app/api/contacts/all`
        }
        const res = await axios.get(
          url,
    
        );
        console.log("contacts admin", res.data);

        dispatch({ type: "FETCH_SUCCESS", payload: res.data });
      } catch (error) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error),
        });
        toast.error(getError(error), {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    };
    fetchData();
  }, [ del, query,count]);

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: "0%" }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      exit={{ opacity: 1 }}
    >
      <Container fluid className="py-3">
        {/* {loading ? (
        <LoadingBox></LoadingBox>
      ) :  */}
        {error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Card>
            <Card.Header>
              <Button
                onClick={() => {
                  navigate(`/contacts/create`);
                }}
                type="success"
                className="btn btn-primary btn-block mt-1"
              >
                Add Contact
              </Button>

              <div className="search-box float-end">
                <InputGroup>
                  <Form.Control
                    aria-label="Search Input"
                    placeholder="Search Contact By first letter"
                    type="search"
                    maxLength={1}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <InputGroup.Text
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setQuery(searchInput);
                    }}
                  >
                    <i className="fas fa-search"></i>
                  </InputGroup.Text>
                </InputGroup>
              </div>
            </Card.Header>
            <Card.Body>
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Phone No</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <CustomSkeleton resultPerPage={5} column={4} />
                  ) : (
                    contacts &&
                    contacts.map((contact, i) => (
                      <tr key={contact._id} className="odd">
                        <td className="text-center">{i + 1}</td>
              
                        <td className="dtr-control sorting_1" tabIndex={0}>
                          {contact.name}
                        </td>
            
                        <td>
                          <IoMdOpen
                            className="open-model"
                            onClick={() =>
                              showModelHandler(contact.phones)
                            }
                          />
                        </td>
                        <td>
                          <Button
                            onClick={() => {
                              navigate(`/contact/${contact._id}`);
                            }}
                            type="success"
                            className="btn btn-primary"
                          >
                            <i className="fa fa-eye"></i>
                          </Button>
                          <Button
                            onClick={() => {
                              deleteContact(contact._id);
                            }}
                            type="danger"
                            className="btn btn-danger ms-1"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </Button>
                          
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Card.Body>
            <Card.Footer>
              <div className="float-start d-flex align-items-center mt-3">
                <p className="p-bold m-0 me-3">Phone Count Filter</p>
                <Form.Group controlId="count">
                  <Form.Select
                    value={count}
                    onChange={(e) => {
                      setCount(e.target.value)
                    }}
                    aria-label="Default select example"
                  >
                    <option value={"default"}>Default</option>
                    <option value={0}>Contacts with 0 Phones No</option>
                    <option value={1}>Contact with atleast 1 Phone no</option>
                    <option value={2}>Contact with atleast 2 Phone no</option>
                  </Form.Select>
                </Form.Group>
              </div>
        
             
            </Card.Footer>
          </Card>
        )}
        {productList && modalShow ? (
          <ArrayView
            show={modalShow}
            onHide={() => setModalShow(false)}
            arr={productList}
          />
        ) : (
          <></>
        )}
        <ToastContainer />
      </Container>
    </motion.div>
  );
}
