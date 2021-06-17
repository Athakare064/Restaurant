import React, { Component } from "react";
import { Control, Errors, LocalForm } from "react-redux-form";
import { Link } from "react-router-dom";
import { Card, CardImg,CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Label,  Button, Row, Col } from 'reactstrap';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isModalOpen:false
        };

      }
    toggleModal=()=>{
        this.setState({
            isModalOpen: !this.state.isModalOpen
          });
      }
      handleSubmit(values) {
        console.log(values)
        this.toggleModal();
    }
      render() {
        return (
            <React.Fragment>
            <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col md={10}>
                                    <Control.select model=".rating" name="Rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                    <Row className="form-group">
                                <Label htmlFor="author" md={2}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                            />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="Comment" md={2}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:1, offset: 2}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                </React.Fragment>
        )
      }
    }


    function RenderDish({dish}){
        if(dish != null){
            return(
                <div className="col-12 col-md-5">
                <Card color="success">
                      <CardImg width="100%" src={dish.image} alt={dish.name} />
                      <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText><div style={{color:'white'}}>{dish.description}</div></CardText>  
                      </CardBody>
                </Card>
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }

    function RenderComments({commentarray}){
        if(commentarray != null){
        let i = 1;
            let arr = commentarray.map((currentcomment)=>{
                return (
                    <div>
                        <div> {i++}. {currentcomment.comment}</div>
                        <br />
                        <div>--by {currentcomment.author} , {new Intl.DateTimeFormat('en-us',{ year: 'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(currentcomment.date)))}</div>
                        <br />
                    </div>
                );
               
            });

            return(
                <div>
                {arr}
                </div>
            );

        }
        else{
            return (
                <div></div>
            );
        }
    }

    const DishDetail = (props) => {

        let currentdish = props.dish;
        
        if(currentdish != null){
        return (
            <div className="container">
                <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
                <div className="row m-1">
                    <RenderDish dish={props.dish}/>
                    <div className="col-12 col-md-5">
                    <h4>Comments</h4>
                    <RenderComments commentarray={props.comments} />
                    <CommentForm dishId={props.dish}/>
                    </div>
                </div>
            </div>
        );
        }
        

        else{
            return (
                <div className="row">
                    *Click on any item to see details
                </div>
            );
        }

    }



export default DishDetail;