import React, { useEffect, useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db } from '../Utils/firebaseUtil.js';
import Header from '../Components/Header/Header.js';
import Input from '../Components/Input';
import MenuButton from '../Components/MenuButton';
import MainMenuButton from '../Components/MainMenuButton';
import Order from '../Components/Order';
import Button from '../Components/Button';
import alertify from 'alertifyjs';

const Lounge = () => {

    const [menuType, setMenuType] = useState([]);
    const [menu, setMenu] = useState([]);
    const [order, setOrder] = useState([]);
    const [total, setTotal] = useState([]);
    const [table, setTable] = useState(0);
    const [client, setClient] = useState('');
    const [modal, setModal] = useState({ status: false });
    const [options, setOptions] = useState("");
    const [extras, setExtras] = useState("");

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

        if (client && table) {
            const command = {
                name: client,
                table: table,
                order: order.map(function (i) { return { name: i.name, quantity: i.quantity } }),
                total: total,
                time: new Date().toLocaleString('pt-BR'),
            }
            db.collection('Pedidos').add(command).then(() => {
                setClient("")
                setTable(0)
                setOrder([])
                setTotal([])
            })
        } else if (!client) {
            alertify.error('Digite o nome do cliente.');
        } else if (!table) {
            alertify.error('Digite a mesa!');
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
            name: `${modal.item.name} Opções: ${options} Extras: ${extras} + R$ 1,00`
        };
        addOrder(updatedItem);
        setModal({ status: false })
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
        const addExtra = (extras.length !== 0) ? 1 : 0;
        return acc + ((item.price + addExtra) * item.quantity)
    }, 0)

    const removeItem = (product) => {
        if (order.includes(product)) {
            product.quantity -= 1;
        }
        const remove = order.filter(el => el.quantity > 0);
        setOrder([...remove]);
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
                    </section>
                </div>
                <div>
                <section className={css(styles.secOptExtras)}>
                    {modal.status === true ? (
                        <div className={css(styles.secExtras)}>
                            <h3>Extras:</h3>
                            {modal.item.extras.map((elem, index) =>
                                <div key={index}>
                                    <input checked={elem === extras} onChange={() => setExtras(elem)} type='radio' name='extras' value={elem} />
                                    <label>{elem}</label>
                                </div>
                            )}
                            <h3>Opções:</h3>
                            {modal.item.options.map((elem, index) =>
                                <div key={index}>
                                    <input checked={elem === options} onChange={() => setOptions(`${elem}`)} type='radio' name='options' value={elem} />
                                    <label>{elem}</label>
                                </div>
                            )}
                            <Button
                                id={'send-order'}
                                handleClick={() => addOptionsExtras()}
                                title='Adicionar Pedido'
                            />
                            <Button
                                id={'send-order'}
                                handleClick={() => setModal({ status: false })}
                                title='Voltar'
                            />
                        </div>
                    ) : false}
                </section>
                <section className={css(styles.secOrder)}>
                    <h1 className={css(styles.orderTitle)}>Pedido:</h1>
                    {
                        order.map((item) =>
                            <Order
                                name={item.name}
                                price={item.price}
                                quantity={item.quantity}
                                delete={(event) => {
                                    event.preventDefault();
                                    removeItem(item)
                                }}
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
                </div>
            </main>
        </div >
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
        marginTop:'2vw',
    },

    secOptions: {
        display: 'flex',
        flexFlow: ['row', 'wrap'],
        justifyContent: 'center',
    },

    secOptExtras:{
        height: 'min-content',
        width: 'auto',
        display: 'flex',
        flexFlow: ['column', 'wrap'],
        justifyContent: 'center',
    },

    secMenu: {
        display: 'flex',
        justifyContent: 'center',
        flexFlow: ['column', 'wrap'],
    },

    orderTitle: {
        textAlign: 'center',
        margin: '1vw 0',
        color: '#0C0804',
    },

    orderTotal: {
        fontSize: '1.0rem',
        fontWeight: '600',
        margin: '1vw 1vw 0'
    },

    secExtras: {
        borderStyle: 'dashed',
        padding: '1vw',
        display: 'flex',
        flexDirection: 'column',
        margin: '0',
        borderColor: '#BBA250',
        fontSize: '0.8rem',
    },

})

export default Lounge;