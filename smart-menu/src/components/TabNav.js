import React from 'react';
import Tab from './Tab'

class TabNav extends React.Component {

    render(){
        return(
            <div>
                <ul className="Menu nav nav-tabs">
                {
                    this.props.tabs.map((tab, index) => {
                        const active = (tab == this.props.selected ? 'active':'');
                        
                        return(
                            <li className="nav-item" key={ index }>
                                <a className={ "nav-link " + active } onClick={ () => {
                                    this.props.setSelected(tab)
                                    }}>
                                    { tab.CategoryName }
                                </a>
                            </li>
                        );
                    })
                }
                    <li className="nav-item" key={ 99999 } onClick={ () => {this.props.addCategoryModal()}}>
                        +
                    </li>
                </ul>
                { this.props.children }
            </div>
        );
    }
}

export default TabNav;