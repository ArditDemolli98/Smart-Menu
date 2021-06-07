import React from 'react';
import Tab from './Tab'

class TabNav extends React.Component {

    render(){
        return(
            <div style={{width: '30%'}}>
                <ul className="nav nav-tabs">
                {
                    this.props.tabs.map(tab => {
                        const active = (tab === this.props.selected ? 'active':'');
                        
                        return(
                            <li className="nav-item" key={ tab.id }>
                                <a className={ "nav-link " + active } onClick={ () => {
                                    this.props.setSelected(tab)
                                    }}>
                                    { tab.name }
                                </a>
                            </li>
                        );
                    })
                }
                </ul>
                { this.props.children }
            </div>
        );
    }
}

export default TabNav;