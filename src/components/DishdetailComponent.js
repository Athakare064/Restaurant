import { Component } from "react";
import { Card, CardImg,CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props){
        super(props);

        this.state = {
            dish : null
        };

    }

    renderDish(dish){
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

    renderComments(commentarray){
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
                <div className="col-12 col-md-5 container">
                <div><h4>Comments</h4></div>
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

    render(){

        let currentdish = this.props.dish;
        
        if(currentdish != null){
        return (
            <div className="row">
                {this.renderDish(currentdish)}
                {this.renderComments(currentdish.comments)}
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

}

export default DishDetail;