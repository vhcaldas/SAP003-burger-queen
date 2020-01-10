import React, { useEffect, useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db } from '../Utils/firebaseUtil.js';
import Header from '../Components/Header/Header.js';
import Input from '../Components/Input';
import MenuButton from '../Components/MenuButton';
import MainMenuButton from '../Components/MainMenuButton';
import Order from '../Components/Order';
import Button from '../Components/Button';

const Restaurant = () => {

    const [menuType, setMenuType] = useState([]);
    const [menu, setMenu] = useState([]);
    const [order, setOrder] = useState([]);
    const [total, setTotal] = useState([]);
    const [table, setTable] = useState();
    const [client, setClient] = useState();
    const [modal, setModal] = useState({ status: false });
    const [options, setOptions] = useState("");
    /*     const [extras, setExtras] = useState(""); */

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
                order: order.map(function (i) { return { name: i.name, quantity: i.count } }),
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

    const verifyOptions = (selectedItem) => {
        if (selectedItem.options.length !== 0) {
            setModal({ status: true, item: selectedItem });
        } else {
            addOrder(selectedItem);
        }
    }

    const addOptionsExtras = () => {
        const updatedItem = {
            ...modal.item,
            name: `${modal.item.name} Opções: ${options}`
        };
        addOrder(updatedItem)
    }

    const addOrder = (selectedItem, updatedItem) => {
        const findItem = order.find(item => item.name === selectedItem.name)
        if (findItem) {
            findItem.quantity += 1;
            setOrder([...order]);
        } else {
            selectedItem.quantity = 1;
            setOrder([...order, selectedItem]);
        }
    }

    const calcTotal = () => order.reduce((acc, item) => {
        return acc + (item.price * item.quantity)
    }, 0)

    /* const removeItem = (selectedItem) => {
        const findIndex = order.findIndex(item => item.name === selectedItem.name);
        if (order[findIndex].quantity > 1) {
            console.log(findIndex)
            order[findIndex].quantity--
            setOrder([...order])
        }
    } */

    return (
        <div>
            <Header />
            <main className={css(styles.main)}>
                <section className={css(styles.secInput)}>
                    <Input placeholder={'Nome do Cliente'}
                        className='input'
                        type={'text'}
                        value={client}
                        onChange={(event) => { setClient(event.target.value) }} />
                    <Input placeholder={'Mesa'}
                        className='input'
                        type={'number'}
                        value={table}
                        min={'0'}
                        onChange={(event) => { setTable(event.target.value) }} />
                </section>
                <div className={css(styles.menu)}>
                    <section className={css(styles.secOptions)}>
                        <MainMenuButton
                            handleClick={(event) => { filterMenu(event) }}
                            title='Café da Manhã'
                            id={'breakfast'} />
                        <MainMenuButton
                            handleClick={(event) => { filterMenu(event) }}
                            title='Demais Opções'
                            id={'otherOptions'} />
                    </section>
                    <section className={css(styles.secMenu)}>
                        {menuType.map((selectedItem) =>
                            <MenuButton
                                handleClick={() => verifyOptions(selectedItem)}
                                {...selectedItem} />
                        )}
                        {modal.status === true ? (
                            <div>
                                {/* <h3>Extras:</h3>
                                    {modal.item.extras.map((elem) => 
                                        <div>
                                            <input type='radio' name='extras' value={elem}/>
                                            <label>{elem}</label>
                                        </div>
                                    )} */}
                                <h3>Opções:</h3>
                                {modal.item.options.map((elem) =>
                                    <div>
                                        <input onChange={() => setOptions(`${options} ${elem}`)} type='radio' name='options' value={elem} />
                                        <label>{elem}</label>
                                    </div>
                                )}
                                <Button
                                    id={'send-order'}
                                    handleClick={() => addOptionsExtras()}
                                    title='Adicionar Pedido'
                                />
                            </div>
                        ) : false}
                    </section>
                </div>
                <section className={css(styles.secOrder)}>
                    <h1 className={css(styles.orderTitle)}>Pedido:</h1>
                    {
                        order.map((item) =>
                            <Order
                                name={item.name}
                                price={item.price}
                                quantity={item.quantity}
                            />
                        )
                    }
                    <p className={css(styles.orderTotal)}>Valor Total: R$ {calcTotal()},00 </p>
                    <div>
                        <Button
                            id={'send-order'}
                            handleClick={() => sendOrder(order)}
                            title='Enviar Pedido'
                        />
                    </div>
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

    menu: {
        width: '50vw',
    },

    secInput: {
        marginBottom: '2vw',
    },

    secOrder: {
        display: 'flex',
        flexDirection: 'column',
        borderColor: '#FFB800',
        borderStyle: 'solid',
        borderWidth: '1vw',
        borderRadius: '2vw',
        width: '30vw',
        height: 'max-content',
        padding: '1vw',
    },

    secOptions: {
        display: 'flex',
        flexFlow: ['row', 'wrap'],
        justifyContent: 'center',
    },

    secMenu: {
        display: 'flex',
        justifyContent: 'center',
        flexFlow: ['column', 'wrap'],
    },

    orderTitle:{
        textAlign:'center',
        margin: '1vw 0',
        color: '#0C0804',
    },

    orderTotal:{
        fontSize: '1.0rem',
        fontWeight: '600',
        margin: '1vw 1vw 0'
    },

})

export default Restaurant;