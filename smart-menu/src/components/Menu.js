import React from 'react';
import './Menu.css';
import TabNav from './TabNav';
import Tab from './Tab';
import Card from '@material-ui/core/Card';
import { Button, ButtonToolbar } from 'react-bootstrap';
import AddCatModal from './AddCatModal';
import config from 'config';
import EditCatModal from './EditCatModal';
import EditProdModal from './EditProdModal';
import AddProdModal from './AddProdModal';



export class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: this.categories[0], addCatModalShow: false, addProdModal: false, editProdModalShow: false, editCatModalShow: false, categories: this.categories, products: this.products
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
        fetch(config.apiUrl + '/api/category/', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
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
        fetch(config.apiUrl + '/api/category/')
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
    addCategoryModal = () => {
        this.setState({ addCatModalShow: true })
    }
    editProductModal = () => {
        this.setState({ editProdModalShow: true })
    }
    editCatModal = () => {
        this.categoryID = this.state.selected
        this.categoryName = category.categoryName;
        this.setState({ editCatModal: true })
    }
    // productsToShow = [];

    // viewProducts=(id)=>{
    //     console.log(id)
    //     this.productsToShow = this.products.filter(product => product.category_id == id)

    // }
    render() {
        const { cats, catid, catname } = this.state;
        let addCatModalClose = () => this.setState({ addCatModalShow: false });
        let editProdModalClose = () => this.setState({ editProdModalShow: false });
        let addProdModalClose = () => this.setState({ addProdModalShow: false });
        let editCatModalClose = () => this.setState({ editCatModalShow: false });

        return (

            <div className="mt-4">
                <TabNav tabs={this.categories} selected={this.state.selected} setSelected={this.setSelected} addCategoryModal={this.addCategoryModal}>
                    {this.categories.map((category, index) => {
                        return (
                            <Tab isSelected={this.state.selected == category.categoryID} key={index}>
                                <div className="container mt-4 ">
                                    <div className='text-right'>
                                        <button className='btn btn-primary' type='button' onClick={() => {
                                            this.categoryID = category.categoryID;
                                            this.categoryName = category.categoryName;
                                            this.setState({ editCatModalShow: true })
                                        }
                                        }>Edit Category</button>
                                    </div>
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
                                                                <div className='col text-right'>
                                                                    <button className='btn btn-primary'
                                                                        onClick={() => {
                                                                            this.prodId = product.productID;
                                                                            this.prodName = product.productName;
                                                                            this.prodDescription = product.productDescription;
                                                                            this.prodPrice = product.price;
                                                                            this.prodCategoryID = product.categoryID;
                                                                            this.prodFileName = product.photoFileName;
                                                                            this.setState({
                                                                                editProdModalShow: true,
                                                                            });
                                                                        }}>
                                                                        Edit
                                                                    </button>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                )


                                            }
                                        })}
                                        <div className="card col-3 m-2 p-1 newProduct" style={{ width: '290px', height: '415px' }} onClick={() => {
                                            this.setState({ addProdModalShow: true });
                                            this.categoryName = category.categoryName
                                        }}>
                                            <div className="card-body">
                                                <div className="m-auto" style={{ fontSize: '100px', textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>+</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                        )

                    })}

                </TabNav>

                <AddCatModal show={this.state.addCatModalShow}
                    onHide={addCatModalClose} />

                <EditProdModal show={this.state.editProdModalShow}
                    onHide={editProdModalClose}
                    prodid={this.prodId}
                    prodname={this.prodName}
                    proddescription={this.prodDescription}
                    prodcategoryid={this.prodCategoryID}
                    prodprice={this.prodPrice}
                    prodfilename={this.prodFileName}
                    categories={this.categories}
                />
                <AddProdModal show={this.state.addProdModalShow}
                    onHide={addProdModalClose}
                    categoryid={this.state.selected}
                    categoryname={this.categoryName} />
                <EditCatModal show={this.state.editCatModalShow}
                    onHide={editCatModalClose}
                    categoryid={this.categoryID}
                    categoryname={this.categoryName} />
            </div >
        );
    }
}

