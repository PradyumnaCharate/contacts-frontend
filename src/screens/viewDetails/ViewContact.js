// import 'bootstrap/dist/css/bootstrap.min.css';
import React, {
  useEffect,
  useReducer,
  useContext,
  useState,
  useRef,
} from "react";

import { getError } from "../../utils";
import { Button, Container, OverlayTrigger, Popover } from "react-bootstrap";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import EditDiveShopModel from "../EditContact";
import { toast, ToastContainer } from "react-toastify";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, contact: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const ViewContacts = () => {
 
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [{ loading, error, contact }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });

        const { data } = await axios.get(
    
          `https://contact-backend-production-a4ba.up.railway.app/api/contacts/${id}`
        );
        // console.log(data);

        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
        toast.error(getError(err), {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    fetchData();
  }, [id]);



  return (
    <Container fluid className="my-3">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {/* Main content */}
          <section className="content">
            <div className="container-fluid">
              <div className="card card-primary card-outline">
                <div className="card-header">
                  <h3 className="card-title">{contact.name?contact.name:"unknown"} Details</h3>
                  <div className="card-tools">
                  
                    <i
                      className="fa fa-edit"
                      style={{ color: "blue" }}
                      onClick={() => setModalShow(true)}
                    ></i>
                  </div>
                </div>
                <div className="card-body">
                  <h4></h4>

                  <section className="content">
             
                      {/* SELECT2 EXAMPLE */}
                      <div className="card card-default ">
                        {/* /.card-header */}
                        <div className="card-body">
                          <div className="row">
                            

                            <div className="col-md-8">
                              {/* details */}
                              <div className="row">
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <p className="mb-0">
                                      <strong>Name </strong>
                                    </p>
                                    <p>{contact.name?contact.name:"unknown"}</p>
                                  </div>
                                  
                                </div>
                                

                              {/* Products */}
                              <div className="row">
                                <div className="col-md-12 mt-2">
                                  <h4>Phones</h4>
                                </div>
                                {contact.phones ? (
                                  <>
                                  <div className="col-md-12">
                                  <Button
                            onClick={() => {
                              navigate(`/contacts/addPhone/${id}`);
                            }}
                            type="success"
                            className="btn btn-primary mb-4"
                          >
                            Add Phone No.
                          </Button>

                                  </div>
                                   

                                    <div className="col-md-12">
                                    <div className="table-responsive">
              <table
                id="example1"
                className="table table-bordered table-striped col-6"
              >
                <thead>
                  <tr>
                    <th>Phone</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contact.phones.map((phone) => (
                    <tr key={phone._id}>
                      <td>{phone.phone}</td>
                      <td>
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/contacts/editPhone/${phone._id}`,{state:{phone:phone.phone}})

                            
                          }}
                          type="danger"
                          className="btn btn-danger btn-block"
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* /.card-body */}
                      </div>

                      {/* /.row */}
                    </div>
                  </section>
                </div>
                {/* /.card */}
              </div>
              {/* /.card */}

              {/* /.card */}
            </div>
            {/* /.container-fluid */}
          </section>
          {/* /.content */}

          <EditDiveShopModel
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <ToastContainer />
        </>
      )}
    </Container>
  );
};

export default ViewContacts;
