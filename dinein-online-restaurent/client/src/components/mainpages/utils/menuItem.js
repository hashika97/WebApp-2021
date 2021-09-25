import React from 'react';
import BtnRender from './BtnRender';

function MenuItem({menu, isUser, deleteMenu, handleCheck}) {

    return (
        <div className="menu-blocks">
           
            <div className="flex">
            {
                isUser && <input type="checkbox" checked={menu.checked}
                onChange={()=>handleCheck(menu._id)} />
            }
        <img src={menu.images.url} alt="" className="menu-image-block"/>

          <div className = "menu-item-detail-align">
           <h3 title={menu.title} className = "menu-item-name">{menu.title}</h3>
           <p className = "menu-item-detail">{menu.description}</p>
           <div className="flex">
           <span className = "menu-item-price">{menu.price}</span>
          <BtnRender menu={menu} deleteMenu={deleteMenu}/>
           </div>
           </div>
           </div>
        </div>
    )
}

export default MenuItem;