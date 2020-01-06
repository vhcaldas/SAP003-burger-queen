import React, { useEffect, useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db } from '../Utils/firebaseUtil.js';
import Card from '../Components/Card.js';
import Header from '../Components/Header/Header.js';
import Button from '../Components/Button';
import Input from '../Components/Input';
import Order from '../Components/Order'

const Restaurant = () => {

    const [type, setType] = useState([]);
    const [menu, setMenu] = useState([]);
    const [client, setClient] = useState();
    const [table, setTable] = useState();
    const [order, setOrder] = useState([]);
    const [total, setTotal] = useState([]);

    useEffect(() => {
        db.collection("Menu")
            .get()
            .then((snapshot) => {
                const findMenu = snapshot.docs.map((elem) => ({
                    id: elem.id,
                    ...elem.data()
                }));
                setMenu(findMenu);
            })
    });

    const filterMeal = (event) => {
        const meal = event.target.id
        const validate = (meal === 'breakfast') ? true : false
        const filteredMenu = menu.filter((elem) => elem.breakfast === validate);
        return setType(filteredMenu);
    }

    if (client && table) {
        db.collection("Pedidos").add({
            client,
            table,
            order: order,
            total: total,
            dateHour: new Date().toLocaleString('pt-BR'),
        }).then(() => {
            setClient('')
            setTable('')
            setOrder([])
            setTotal('')
        })
    }

    return (
        <div>
            <Header />
            <main className={css(styles.main)}>
                <section className={css(styles.secInput)}>
                    <Input placeholder={'Nome do Cliente'}
                        className='input'
                        type={'text'}
                        value={client}
                        onChange={(event) => {setClient(event.currentTarget.value) }} />
                    <Input placeholder={'Mesa'}
                        className='input'
                        type={'number'}
                        value={table}
                        onChange={(event) => {setTable(event.currentTarget.value)}} />
                </section>
                <section className={css(styles.secInput)}>
                </section>
                <section className={css(styles.secOptions)}>
                    <Button
                        handleClick={(event) => { filterMeal(event) }}
                        title='Café da Manhã'
                        id={'breakfast'} />
                    <Button
                        handleClick={(event) => { filterMeal(event) }}
                        title='Demais Opções'
                        id={'otherOptions'} />
                </section>
                <section>
                    {type.map((menuItem) =>
                        <Card
                            handleClick={(e) => console.log(menuItem.name)}
                            name={menuItem.name}
                            price={menuItem.price} />
                    )}
                </section>
                <aside>
                    <Order
                        client = {setClient}
                        table= {setTable} 
                        order= {setOrder} 
                        total= {setTotal} 
                    />
                </aside>
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

    secOptions: {
        display: 'flex',
        flexFlow: ['row', 'wrap']
    },
})

export default Restaurant;