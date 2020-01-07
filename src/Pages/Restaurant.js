import React, { useEffect, useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db } from '../Utils/firebaseUtil.js';
import Header from '../Components/Header/Header.js';
import Button from '../Components/MainMenuButton';
import Input from '../Components/Input';
import Order from '../Components/Order';
import MenuButton from '../Components/MenuButton';
import MainMenuButton from '../Components/MainMenuButton'

const Restaurant = () => {

    const [menuType, setMenuType] = useState([]);
    const [menu, setMenu] = useState([]);
    const [order, setOrder] = useState([]);
    const [total, setTotal] = useState([]);
    const [table, setTable] = useState();
    const [client, setClient] = useState();
    const [options, setOptions] = useState([])

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
                order: order,
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

    const checkOptions = (menuItem) => {
        if (menuItem.options.length !== 0) {
            setOptions(menuItem);
        } else {
            setOptions([]);
            addOrder(menuItem);
        }
    }

    const addOrder = (menuItem) => {
        const selectedItem = (menuItem.quantity += 1);
        setOrder([...order, selectedItem]);
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
                    {menuType.map((menuItem) =>
                        <MenuButton
                            handleClick={() => checkOptions(menuItem)}
                            name={menuItem.name}
                            price={menuItem.price} />
                    )}
                </section>
                <aside>
                {
                    order.map((item)=> 
                    <Order
                        client={setClient}
                        table={setTable}
                        order={Order}
                        options={options}
                        total = {total}

                    />
                    )
                }
                <Button
                    handleClick={(order) => {sendOrder(order)}}
                    title='Enviar Pedido'
                    id={'send-order'} 
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
        padding: '1vw',
        justifyContent: 'center',
    },

    secMenu: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },

    secOptions: {
        display: 'flex',
        flexFlow: ['row', 'wrap']
    },
})

export default Restaurant;