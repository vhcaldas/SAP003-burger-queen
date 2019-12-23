import React, { useEffect, useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db } from '../Utils/firebaseUtil.js';
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
        <div>
            <Header/>
            <main className={css(styles.main)}>
                <section className={css(styles.options)}>
                    <h1>CAFÉ DA MANHÃ:</h1>            
                        {menu.map(menuItem => { 
                            return menuItem.breakfast ? (
                                <Card 
                                name={menuItem.name} 
                                price={menuItem.price} 
                                handleClick={() => console.log(menuItem)}/>
                            ) : (
                            false
                            );
                        })}
                    <h1>DEMAIS OPÇÕES:</h1>
                        <h2>Hambúrgueres:</h2>
                            {menu.map(menuItem => { 
                                return menuItem.burguer ? (
                                    <Card 
                                    name={menuItem.name} 
                                    price={menuItem.price} 
                                    handleClick={() => console.log(menuItem)}/>
                                ) : (
                                false
                                );
                            })}
                        <h2>Acompanhamentos:</h2>
                            {menu.map(menuItem => { 
                                return menuItem.sidedish ? (
                                    <Card 
                                    name={menuItem.name} 
                                    price={menuItem.price} 
                                    handleClick={() => console.log(menuItem)}/>
                                ) : (
                                false
                                );
                            })}
                        <h2>Bebidas:</h2>
                            {menu.map(menuItem => { 
                                return menuItem.beverage ? (
                                    <Card 
                                    name={menuItem.name} 
                                    price={menuItem.price} 
                                    handleClick={() => console.log(menuItem)}/>
                                ) : (
                                false
                                );
                            })}
                </section>
            </main>
        </div>
    )
}

const styles = StyleSheet.create({
    main: {
        fontFamily: 'Montserrat Alternates',
        src: "url('https://fonts.googleapis.com/css?family=Montserrat+Alternates&display=swap')",
    },
})

export default Restaurant