import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
  Label,
  ModalHeader,
} from "reactstrap";
import { Link } from "react-router-dom";
import Button from "reactstrap/lib/Button";
import Modal from "reactstrap/lib/Modal";
import { LocalForm, Control,Errors } from "react-redux-form";
import ModalBody from "reactstrap/lib/ModalBody";

const minLength = (val) => val && val.length >= 2;
const maxLength = (val) => val && val.length <= 15;


function RenderCampsite({ campsite }) {
  return (
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={campsite.image} alt={campsite.name} />
        <CardBody>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments }) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        
        {comments.map((comment) => {
          return (
            <div key={comment.id}>
              <p>
                {comment.text}
                <br />
                -- {comment.author},{" "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).format(new Date(Date.parse(comment.date)))}
              </p>
            </div>
          );
        })}
        <CommentForm/>
      </div>
    );
  }
  return <div />;
}

function CampsiteInfo(props) {
  if (props.campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/directory">Directory</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderCampsite campsite={props.campsite} />
          <RenderComments comments={props.comments} />
        </div>
      </div>
    );
  }
  return <div />;
}



class CommentForm extends React.Component {
   state = {
      isModalOpen: false,
    };

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  handleSubmit = (values) => {
   alert(JSON.stringify(values));
  };


  render(){
    return(
      <div>
        <Button outline onClick={this.toggleModal}>
          <i className="fa fa-lg fa-pencil" /> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
                 <LocalForm onSubmit={this.handleSubmit}>
              <div className="form-group">
                <Label>Rating</Label>
                <Control.select
                  model=".rating"
                  id="rating"
                  name="rating"
                  className="form-control"
                  defaultValue="1"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </div>
              <div className="form-group">
                <Label>Your Name</Label>
                <Control.text
                  model=".name"
                  id="name"
                  name="name"
                  className="form-control"
                  validators={{
                    minLength: minLength,
                    maxLength: maxLength,
                  }}
                />
                <Errors
                  model=".name"
                  show="touched"
                  component="div"
                  className="text-danger"
                  messages={{
                    minLength: "min length must be 2",
                    maxLength: "max length must be 15",
                  }}
                />
              </div>
              <div className="form-group">
                <Label>Comment</Label>
                <Control.textarea
                  model=".comment"
                  id="comment"
                  name="comment"
                  className="form-control"
                  rows="6"
                />
              </div>
              <Button color="primary">Submit</Button>
            </LocalForm>
            </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default CampsiteInfo;
