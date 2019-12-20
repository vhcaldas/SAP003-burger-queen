import React, { useEffect, useState } from 'react';
import { db } from '../firebaseUtil.js';
import Card from '../Components/Card.js';
import Header from '../Components/Header/Header.js';


const Restaurant = () => {

    const[menu, setMenu] = useState([]);

    useEffect(() => {
        db.collection("Menu").get()
            .then((querySnapshot) => {
                querySnapshot.forEach(function(doc) {
                    setMenu((currentState) =>
                        [...currentState, doc.data()]
                    )
                });
            });
        }, []);

    return (
        <main>
            <Header/>
            
            {menu.map(menuItem => 
                <Card 
                name={menuItem.name} 
                price={menuItem.price} 
                handleClick={() => console.log(menuItem)}/>
            )}
        </main>
    )
}

export default Restaurant