import React, { useEffect, useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db } from '../Utils/firebaseUtil.js';
import Input from '../Components/Input';
import MenuButton from '../Components/MenuButton';
import MainMenuButton from '../Components/MainMenuButton';
import Order from '../Components/Order';
import Button from '../Components/Button';
import { useAlert } from 'react-alert'


const Lounge = () => {

    const [menuType, setMenuType] = useState([]);
    const [menu, setMenu] = useState([]);
    const [order, setOrder] = useState([]);
    const [table, setTable] = useState(0);
    const [client, setClient] = useState('');
    const [modal, setModal] = useState({ status: false });
    const [options, setOptions] = useState("");
    const [extras, setExtras] = useState("");
    const alert = useAlert();

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
        const validate = (dish === 'breakfast');
        const filteredMenu = menu.filter((elem) => elem.breakfast === validate);
        return setMenuType(filteredMenu);
    }

    const sendOrder = () => {

        if (client && table && order.length!==0) {
            const command = {
                name: client,
                table,
                order,
                total: calcTotal(),
                time: new Date().toLocaleString('pt-BR'),
                getTime: new Date().getTime(),
                status: 'Pendente',
            }
            db.collection('Pedidos').add(command).then(() => {
                setClient("")
                setTable(0)
                setOrder([])
            })
        } else if (!client) {
            alert.show('Digite o nome do Cliente.');
        } else if (!table) {
            alert.show('Digite o número da mesa.');
        } else if (!order.length) {
            alert.show('Faça o Pedido.');
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
            name: `${modal.item.name} Opções: ${options} Extras: ${extras}`, 
            extrasPrice: (extras.length !== 0 ? 1 : 0)
        };
        addOrder(updatedItem);
        setModal({ status: false })
        setExtras([]);
    }

    const addOrder = (selectedItem) => {
        const findItem = order.find(item => item.name === selectedItem.name)
        if (findItem) {
            findItem.quantity += 1;
            setOrder([...order]);
        } else {
            selectedItem.quantity = 1;
            setOrder([...order, selectedItem]);
        }
    }

    const calcTotal = () => order.reduce((acc, calcTotal) => {
        //console.log(extras.length)
        if (calcTotal.extrasPrice) {
            return acc + ((calcTotal.price + calcTotal.extrasPrice) * calcTotal.quantity)
        } else {
            return acc + (calcTotal.price * calcTotal.quantity)
        }
    }, 0)

    const removeItem = (product) => {
        product.quantity -= 1;
        const remove = order.filter(el => el.quantity > 0);
        setOrder([...remove]);
    }

    return (
        <div>
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
                                {modal.item.extras.map((modalExtras, index) =>
                                    <div key={index}>
                                        <input checked={modalExtras === extras} onChange={() => setExtras(modalExtras)} type='radio' name='extras' value={modalExtras} />
                                        <label>{modalExtras}</label>
                                    </div>
                                )}
                                <h3>Opções:</h3>
                                {modal.item.options.map((modalOptions, index) =>
                                    <div key={index}>
                                        <input checked={modalOptions === options} onChange={() => setOptions(`${modalOptions}`)} type='radio' name='options' value={modalOptions} />
                                        <label>{modalOptions}</label>
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
                            order.map((product, item) =>
                                <Order
                                    name={product.name}
                                    price={product.price}
                                    quantity={product.quantity}
                                    delete={(event) => {
                                        event.preventDefault();
                                        removeItem(product)
                                    }}
                                    key={item.name}
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
        marginTop: '2vw',
    },

    secOptions: {
        display: 'flex',
        flexFlow: ['row', 'wrap'],
        justifyContent: 'center',
    },

    secOptExtras: {
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