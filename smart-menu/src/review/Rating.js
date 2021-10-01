import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import { accountService } from '@/_services';
//import {AddReviewModal} from './AddReviewModal';
import { Role } from '@/_helpers';


export class Review extends Component{

    constructor(props){
        super(props);
        this.state={rats:[], addModalShow:false}
    }

    refreshList(){
        fetch('http://localhost:5000/api/rating', {
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        })
        .then(response=>response.json())
        .then(data=>{
            this.setState({rats:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteReview(ratid){
        if(window.confirm('Are you sure?')){
            fetch('http://localhost:5000/api/rating/'+ratid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    
    
    render(){
        const {revs, revid, revname, revrating, revmessage}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        
        return(
            <div className="container">
                <h1>This is the Rating section!</h1>
                <p>This is used to add a Rating CRUD list to our Review Section</p>
            
               
                <Table className="mt-4" striped bordered hover size="sm" >
                    <thead>
                        <th>Rating</th>
                        <th>Options</th>
                    </thead>
                    <tbody>
                        {revs.map(rat=>
                            <tr key={rat.RatingID}>
                                <td>{rat.RatingDescription}</td>
                                <td>
<ButtonToolbar>
    

        <Button className="mr-2" variant="danger"
        onClick={()=>this.deleteReview(rev.ReviewID)}>
            Delete
        </Button>
</ButtonToolbar>
                                </td>

                            </tr>
                            )}
                    </tbody>
                </Table> 
              
            </div>
        )
    }
}