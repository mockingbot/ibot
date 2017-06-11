import React from 'react'
import style from './index.css'

class ContextMenu extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            menus: props.menus
        }
    }

    componentWillReceiveProps(nextProps) {
        if (Array.isArray(nextProps)) {
            this.setState({
                menus: nextProps.menus
            })
        }
    }

    render() {
        let menus = this.state.menus
        const Menus = menus.map((item) => 
            <li className={menu} onClick={item.handler}>{item.value}</li>
        )

        return (
            <ul className={menubox}>
                <Menus></Menus>            
            </ul>
        )
    }
} 

export default ContextMenu
