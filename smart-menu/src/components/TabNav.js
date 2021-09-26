import React from 'react';
import Tab from './Tab'
import { Button, ButtonToolbar } from 'react-bootstrap';

class TabNav extends React.Component {

    render() {
        return (
            <div>
                <ul className="Menu nav nav-tabs">
                    {
                        this.props.tabs.map((tab, index) => {
                            const active = (tab.categoryID == this.props.selected ? 'active' : '');

                            return (
                                <li className="nav-item" key={index}>
                                    <a className={"nav-link " + active} onClick={() => {
                                        this.props.setSelected(tab.categoryID);
                                    }}>
                                        {tab.categoryName}
                                    </a>
                                </li>
                            );
                        })
                    }
                    <Button className="nav-item" key={99999} onClick={() => { this.props.addCategoryModal() }}>
                        +
                    </Button>
                    {/* <Button className="nav-item" key={99999} onClick={() => { this.props.addCategoryModal() }}>
                        -
                    </Button> */}
                </ul>
                {this.props.children}
            </div>
        );
    }
}

export default TabNav;