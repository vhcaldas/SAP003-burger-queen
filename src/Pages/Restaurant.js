import React, { useEffect, useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db } from '../Utils/firebaseUtil.js';
import Card from '../Components/Card.js';
import Header from '../Components/Header/Header.js';
import Button from '../Components/Button';

const Restaurant = () => {

    const [menu, setMenu] = useState([]);
    
    useEffect(() => {
        db.collection("Menu").get()
            .then((querySnapshot) => {
                const itens = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                return setMenu(itens)
            });
            }, []);
            
    return (
        <div>
            <Header/>
            <main className={css(styles.main)}>
                <section className={css(styles.secInput)}>
                </section>
                <section className={css(styles.secOptions)}>
                    <Button
                    handleClick = {() => menu.map(menuItem => { 
                        return menuItem.breakfast ? (
                            <Card 
                            name={menuItem.name} 
                            price={menuItem.price} 
                            handleClick={() => console.log(menuItem)}/>
                        ) : (
                        false
                        );
                        })}
                        title='Café da Manhã'/>

                    <Button
                    handleClick = {() => menu.map(menuItem => { 
                        return menuItem.other ? (
                            <Card 
                            name={menuItem.name} 
                            price={menuItem.price} 
                            handleClick={() => console.log(menuItem)}/>
                        ) : (
                        false
                        );
                    })}
                    title='Demais Opções'/>
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