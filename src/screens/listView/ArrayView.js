import { Modal, Button, Container } from "react-bootstrap";

export default function ArrayView(props) {
  // console.log("props", props);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Contacts
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container
          className="small-container"
          style={{ backgroundColor: "#f4f6f9" }}
        >
          {props.arr.length > 0 ? 
          <ol>
            {props.arr && props.arr.map((item) => <li key={item._id}>{item.phone}</li>)}
          </ol>
          : "No Phones"}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
