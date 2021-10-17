import React from 'react';
import './Menu.css';
import TabNav from './TabNav';
import Tab from './Tab';
import config from 'config';
import { Home } from '../home/index';
import { useParams } from 'react-router-dom';
import { accountService } from '@/_services';


export class ShowMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: this.categories[0], categories: this.categories, products: this.products
        }
    }

    categories = [];
    products = [];

    prodId
    prodCategoryID
    prodDescription
    prodFileName
    prodName
    prodPrice
    categoryName
    categoryID


    getCategories() {

        let categories = this.categories;
        fetch(config.apiUrl + '/api/category/' + String(accountService.userValue.id), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                this.categories = data
                if (JSON.stringify(categories) != JSON.stringify(this.categories)) {
                    this.setState({ categories: this.categories })
                }
            });
    }
    getProducts() {
        let products = this.products
        fetch(config.apiUrl + '/api/product/')
            .then(response => response.json())
            .then(data => {
                this.products = data;
                if (JSON.stringify(products) != JSON.stringify(this.products)) {
                    this.setState({ products: this.products })
                }
            })

    }

    refreshList() {
        this.getCategories()
        this.getProducts()
    }
    UNSAFE_componentWillMount() {
        this.getProducts()
        this.getCategories()
        fetch(config.apiUrl + '/api/category/' + String(accountService.userValue.id))
            .then(response => response.json())
            .then(data => {
                this.categories = data;
                this.setState({ selected: this.categories[0].categoryID });
            })
    }
    componentDidUpdate() {
        this.refreshList()
    }

    setSelected = (tab) => {
        this.setState({ selected: tab });
    }

    render() {
        const { cats, catid, catname } = this.state;

        return (
            <div className="mt-4">
                <TabNav tabs={this.categories} selected={this.state.selected} setSelected={this.setSelected}>
                    {this.categories.map((category, index) => {
                        return (
                            <Tab isSelected={this.state.selected == category.categoryID} key={index}>
                                <div className="container mt-4 ">
                                    <div className='row justify-content-center'>
                                        {this.products.map((product, i) => {
                                            if (product.categoryID == category.categoryID) {
                                                return (
                                                    <div className="card col-3 m-2 p-1" key={i} style={{ width: '290px', height: '415px' }}>
                                                        <img className="card-img-top p-3" width='400px' height='250px' src={config.apiUrl + '/Photos/' + product.photoFileName} alt="Card image cap"></img>
                                                        <div className="card-body">
                                                            <h5 className="card-title">{product.productName}</h5>
                                                            <p className="card-text">{product.productDescription}</p>
                                                            <div className='row p-0'>
                                                                <div className='col'>
                                                                    <h3>{product.price}$</h3>
                                                                </div>
                                                            </div>
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
            </div >
        );
    }
}

