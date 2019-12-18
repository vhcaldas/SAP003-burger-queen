import React, { useEffect, useState } from 'react';
import { db } from './Utils/firebaseUtil';
import Card from './Card'

const Restaurant = () => {

    const[menu, setMenu] = useState([])

    useEffect(() => {
        db.collection("Menu").get()
            .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                setMenu((currentState) => 
                    [...currentState, doc.data()]
                );
            });
        });
    }, [])

    console.log(menu);

    return (
        <div>
            {menu.map(menuItem => 
                <Card 
                name={menuItem.name} 
                price={menuItem.price} 
                handleClick={() => console.log(menuItem)}/>    
            )}
        </div>
    )
}

export default Restaurant