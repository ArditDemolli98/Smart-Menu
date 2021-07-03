import React from 'react';
import './Menu.css';
import TabNav from './TabNav';
import Tab from './Tab';

export class Menu extends React.Component{
    constructor(props){
        super(props);
        
        this.state ={
            selected: '1'
        }
    }

    setSelected = (tab) => {
        this.setState({ selected: tab});
    }
    categories = [
        {
            id:'1',
            name:'Drinks'
        },
        {
            id:'2',
            name:'Meat'
        },
        {
            id:'3',
            name:'Fast Food'
        },
        {
            id:'4',
            name:'Speciale'
        }
    ]
    products =[
        {
            id:'1',
            name:'Coca-Cola',
            category_id:"1",
            description: 'Some description',
            price:'5$'
        },
        {
            id:'2',
            name:'Hamburger',
            category_id:"3",
            description: 'Some description',
            price:'5$'
        },
        {
            id:'3',
            name:'Beef',
            category_id:"2",
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

        return(
     
            <div className = "Menu mt-4">
                <TabNav tabs ={this.categories} selected={this.state.selected} products={this.products} viewProducts={this.viewProducts} setSelected={this.setSelected}>
                    {this.categories.forEach((category, index) => {
                        <Tab isSelected={this.state.selected === category} key={index}>
                            <div className="container">
                        
                                {this.products.map(product => {
                                    
                                    if(product.category_id == category.id){
                                        return(<div className="card"  key={product.id} style={{width: '18rem'}}>
                                            <img className="card-img-top" src="..." alt="Card image cap"></img>
                                            <div className="card-body">
                                                <h5 className="card-title">{product.name}</h5>
                                                <p className="card-text">{product.description}</p>
                                                <h3>{product.price}</h3>
                                            </div>
                                        </div>)
                                    }
                                    
                                })}
                            </div>
                        </Tab>
                        
                    })}
                    
                </TabNav>

            </div>
        );
    }
}

