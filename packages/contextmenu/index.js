import React from 'react'
import styles from './index.css'

class ContextMenu extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            menus: props.menus,
            style: props.style
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
        const menus = this.state.menus
        const style = this.state.style

        let Menus = menus.map((item, index) => 
            <li className={styles.menu} onClick={item.handler} key={index}>{item.value}</li>
        )
  
        return (
            <ul className={styles.menubox} style={{width: style.width}}>
                {Menus}      
            </ul>
        )
    }
} 

export default ContextMenu
