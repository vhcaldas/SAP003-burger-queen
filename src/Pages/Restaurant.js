import React, { useEffect, useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db } from '../Utils/firebaseUtil.js';
import Header from '../Components/Header/Header.js';
import Input from '../Components/Input';
import OrderPad from '../Components/OrderPad';
import MenuButton from '../Components/MenuButton';
import MainMenuButton from '../Components/MainMenuButton';
import Button from '../Components/Button'

const Restaurant = () => {

    const [menuType, setMenuType] = useState([]);
    const [menu, setMenu] = useState([]);
    const [order, setOrder] = useState([]);
    const [total, setTotal] = useState([]);
    const [table, setTable] = useState();
    const [client, setClient] = useState();
    const [options, setOptions] = useState([]);

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

    const filterMenu = (event) => {
        const dish = event.target.id;
        const validate = (dish === 'breakfast') ? true : false;
        const filteredMenu = menu.filter((elem) => elem.breakfast === validate);
        return setMenuType(filteredMenu);
    }

    const sendOrder = () => {
        /*  if((table && client) === 0){
            alert('Preencha o nº da mesa e o nome do cliente.')
        } else if (order.length === 0){
            alert('Adicione produtos ao pedido.')
        } */
        if (client && table) {
            db.collection("Pedidos").add({
                name: client,
                table: table,
                order: order.map(function(i) {return {name:i.name, quantity: i.count}}),
                total: total,
                time: new Date().toLocaleString('pt-BR')
            }).then(() => {
                setClient('')
                setTable('')
                setOrder([])
                setTotal('')
            })
        }
    }  

/*     const checkOptions = (selectedItem) => {
        if (selectedItem.options.length !== 0) {
            setOptions(selectedItem);
        } else {
            setOptions([]);
            addOrder(selectedItem);
            
        }
    } */

    const addOrder = (selectedItem) => {
        const findItem= order.find(item => item.name===selectedItem.name)
        if(findItem){
            findItem.quantity++;
            setOrder([...order, selectedItem]);
        } else {
            selectedItem.quantity = 1;
            setOrder([...order,selectedItem]);
            console.log(selectedItem);
        }        
    }

    const calcTotal = () => order.reduce((acc, item)=> {
        return acc + (item.price*item.quantity)
    }, 0)

    const removeItem = (selectedItem) => {
        const findIndex = order.findIndex(item => item.name === selectedItem.name);
        if (order[findIndex].quantity > 1) {
            console.log(findIndex)
            order[findIndex].quantity--
            setOrder([...order])
        }
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
                <section className={css(styles.secOptions)}>
                    <MainMenuButton
                        handleClick={(event) => {filterMenu(event)}}
                        title='Café da Manhã'
                        id={'breakfast'} />
                    <MainMenuButton
                        handleClick={(event) => {filterMenu(event)}}
                        title='Demais Opções'
                        id={'otherOptions'}/>
                </section>
                <section className={css(styles.secMenu)}>
                    {menuType.map((selectedItem) =>
                        <MenuButton
                            handleClick={() => addOrder(selectedItem)}
                            name={selectedItem.name}
                            price={selectedItem.price}/>
                    )}
                </section>
                <section>
                {
                    order.map((item)=> 
                    <OrderPad
                    name= {item.name}
                    price={item.price}
                    quantity= {item.quantity}
                    total={calcTotal()}
                    />
                    )
                }
                < Button
                    name='Enviar Pedido'
                    id={'send-order'} 
                    click={() => sendOrder(order)}
                />
                </section>
            </main>
        </div>
    )
}

const styles = StyleSheet.create({
    main: {
        fontFamily: ['Montserrat', 'sans-serif'],
        src: "url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap')",
        display: 'flex',
        flexFlow: ['columm', 'wrap'],
        padding: '1vw',
        justifyContent: 'center',
    },

    secMenu: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '50%'
    },

    secOptions: {
        display: 'flex',
        flexFlow: ['row', 'wrap']
    },
})

export default Restaurant;