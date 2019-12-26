import React, { useEffect, useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db } from '../Utils/firebaseUtil.js';
import Card from '../Components/Card.js';
import Header from '../Components/Header/Header.js';
import Input from '../Components/Input';
import Order from '../Components/Order';

const Restaurant = () => {

    const[menu, setMenu] = useState([]);
    const [client, setClient] = useState();
    const [table, setTable] = useState();
    const [order, setOrder] = useState();
    const [total, setTotal] = useState();

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

        const takeOrder = () => {
            if(client && table) {
                db.collection("Pedidos").add({
                    client,
                    table,
                    order: order,
                    total: total,
                    dateHour: new Date().toLocaleString('pt-BR'),
                }).then (() => {
                    setClient('')
                    setTable('')
                    setOrder([])
                    setTotal('')
                })
            }
        }

    return (
        <div>
            <Header/>
            <main className={css(styles.main)}>
                <section className={css(styles.secInput)}>
                    <Input placeholder={'Nome do Cliente'}  
                        className='input'
                        type={'text'}
                        value={client}
                        onChange={(event) => {setClient(event.currentTarget.value)}}/>
                    <Input placeholder={'Mesa'}  
                        className='input'
                        type={'number'}
                        value={table}
                        onChange={(event) =>{setTable(event.currentTarget.value)}}/>
                </section>
                <section className={css(styles.secOptions)}>
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
                    }
                    )}
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
                <section>
                    <Order/>

                </section>
            </main>
        </div>
    )
}

const styles = StyleSheet.create({
    main: {
        fontFamily: ['Montserrat', 'sans-serif'],
        src: "url('https://fonts.googleapis.com/css?family=Montserrat&display=swap')",
        display: 'flex',
        flexFlow: ['columm', 'wrap'],
        padding: '1vw'
    },

    secOptions:{
        display: 'flex',
        flexFlow: ['row', 'wrap']
    },
})

export default Restaurant