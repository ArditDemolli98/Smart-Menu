import React from 'react';
import './Menu.css';
import TabNav from './TabNav';
import Tab from './Tab';
import Card from '@material-ui/core/Card';
import {Button,ButtonToolbar} from 'react-bootstrap';
import AddCatModal from './AddCatModal';


class Menu extends React.Component{
    constructor(props){
        super(props);
        
        this.state ={
            selected: this.categories[0], addModalShow:false,
        }
    }
    getCategories(){
        fetch(process.env.REACT_APP_API+'categories/')
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            this.categories=data;
        })
    }
    getProducts(){
        fetch(process.env.REACT_APP_API+'products/')
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            this.products=data;
        })
    }

    // componentDidMount(){
    //     this.refreshList();
    // }
    componentWillMount(){
        this.getProducts()
        fetch(process.env.REACT_APP_API+'categories/')
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            this.categories=data;
            this.setState({ selected: this.categories[0]});
        })

        
        
    }
    componentDidUpdate(){
        // this.getCategories()
        // this.getProducts()
    }

    setSelected = (tab) => {
        this.setState({ selected: tab});
    }
    addCategoryModal = () => {
        console.log('doni')
        this.setState({addModalShow:true})
    }
    categories = [
        // {
        //     id:'1',
        //     name:'Drinks'
        // },
        // {
        //     id:'2',
        //     name:'Meat'
        // },
        // {
        //     id:'3',
        //     name:'Fast Food'
        // },
        
    ]
    products =[
        {
            id:'1',
            name:'Coca-Cola',
            category_name:"Drinks",
            category_id:'1',
            description: 'Some description',
            price:'5$'
        },
        {
            id:'2',
            name:'Hamburger',
            category_name:"Fast Food",
            category_id:'3',
            description: 'Some description',
            price:'5$'
        },
        {
            id:'2',
            name:'Chicken Burger',
            category_name:"Fast Food",
            category_id:'3',
            description: 'Some description',
            price:'5$'
        },
        {
            id:'2',
            name:'Sandwich',
            category_name:"Fast Food",
            category_id:'3',
            description: 'Some description',
            price:'5$'
        },
        {
            id:'3',
            name:'Beef',
            category_name:"Meat",
            category_id:'2',
            description: 'Some description',
            price:'5$'
        },
        {
            id:'3',
            name:'Steak',
            category_name:"Meat",
            category_id:'2',
            description: 'Some description',
            price:'5$'
        },
        {
            id:'3',
            name:'Steak',
            category_name:"Meat",
            category_id:'2',
            description: 'Some description',
            price:'5$'
        },
        {
            id:'3',
            name:'Steak',
            category_name:"Meat",
            category_id:'2',
            description: 'Some description',
            price:'5$'
        },
        {
            id:'3',
            name:'Steak',
            category_name:"Meat",
            category_id:'2',
            description: 'Some description',
            price:'5$'
        }
        
    ]
    // productsToShow = [];

    // viewProducts=(id)=>{
    //     console.log(id)
    //     this.productsToShow = this.products.filter(product => product.category_id == id)
        
    // }
    render(){
        let addModalClose=()=>this.setState({addModalShow:false});
        return(


            
            <div className = "Menu mt-4">
                <TabNav tabs ={this.categories} selected={this.state.selected} setSelected={this.setSelected} addCategoryModal={this.addCategoryModal}>
                    {this.categories.map((category, index) => {
                        return(
                        <Tab isSelected={this.state.selected.CategoryID==category.CategoryID} key={index}>
                            <div className="container mt-4 ">
                                <div className='row justify-content-center'>
                                    {this.products.map((product,i) => {
                                    if(product.CategoryID == category.CategoryID){
                                            return(
                                            <div className="card col-3 m-2" key={i}>
                                                <img className="card-img-top" src="..." alt="Card image cap"></img>
                                                <div className="card-body">
                                                    <h5 className="card-title">{product.ProductName}</h5>
                                                    <p className="card-text">{product.ProductDescription}</p>
                                                    <h3>{product.Price}$</h3>
                                                </div>
                                            </div>
                                            )
                                            
                                        }
                                    })}

                                </div>
                            </div>
                        </Tab>
                        )
                        
                    })}
                    
                </TabNav>

                <AddCatModal show={this.state.addModalShow}
                onHide={addModalClose}/>
                
                    
            </div>
        );
    }
}

export default Menu;