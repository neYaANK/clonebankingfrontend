import React from "react";
import './Menu.css'

const Menu = ({header, items, active, setActive}) => {
    return(
        <div className={active ? 'menu active' : 'menu'}> 
            <div className="blur" onPointerOver={() => setActive(false)}/>
            <div className="menu__content">
                <div class="menu__header">{header}</div>
                <ul>
                    {items.map(item =>
                        <li>
                            <a href={item.href}>{item.value}</a>
                            <span class="material-symbols-outlined">{item.icon}</span>
                        </li>    
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Menu;