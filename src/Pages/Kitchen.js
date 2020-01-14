import React, { useEffect, useState } from 'react';
import { db } from '../Utils/firebaseUtil.js';
import { StyleSheet, css } from 'aphrodite';
import CardPendingOrder from '../Components/CardPendingOrder';
import CardDoneOrder from '../Components/CardDoneOrder';

const Kitchen = () => {

    const [orderDone, setOrderDone] = useState([]);
    const [orderPending, setOrderPending] = useState([]);


    useEffect(() => {

        db.collection("Pedidos")
            .where('status', '==', 'Pendente')
            .get()
            .then((snapshot) => {
                const findOrder = snapshot.docs.map((elem) => ({
                    id: elem.id,
                    ...elem.data()
                }));
                setOrderPending(findOrder);
            })

        db.collection("Pedidos")
            .where('status', '==', 'Pronto')
            .get()
            .then((snapshot) => {
                const findDoneOrder = snapshot.docs.map((elem) => ({
                    id: elem.id,
                    ...elem.data()
                }));
                setOrderDone(findDoneOrder);
            })
    }, []);

    const updateStatus = (command) => {
        console.log(command)
        if (command.status === 'Pendente') {
            command.status = 'Pronto';
            db.collection("Pedidos")
                .doc(command.id)
                .update({
                    status: "Pronto",
                    EndTime: new Date().getTime()
                });
            const filteredOrders = orderPending.filter((orders) => orders.status === 'Pendente');
            setOrderDone([...orderDone, command])
            setOrderPending([...filteredOrders])
        }
    }


    return (
        <main className={css(styles.kitchenMain)}>
            <section className={css(styles.secPendingOrder)}>
                <h1 className={css(styles.orderTitle)}>Pedidos Pendentes</h1>
                {
                    orderPending.map((command) => (
                        <CardPendingOrder
                            name={command.name}
                            desk={command.table}
                            order={command.order.map((i) => (
                                <div className={css(styles.order)}>
                                    <p className={css(styles.burguer)}>{i.quantity + ' '}
                                        {i.name}</p>
                                </div>))
                            }
                            time={command.time}
                            status={command.status}
                            changeStatus={
                                (event) => {
                                    event.preventDefault();
                                    updateStatus(command)
                                }
                            }
                            title={
                                command.status === "Pendente" ? "Pedido Pendente" : "Pedido Ok"
                            }
                        />
                    )
                    )
                }
            </section>
            <section className={css(styles.secDoneOrder)}>
                <h1 className={css(styles.orderTitle)}>Pedidos Concluídos</h1>
                {
                    orderDone.map((command) => (
                        <CardDoneOrder
                            name={command.name}
                            desk={command.table}
                            order={command.order.map((i) => (
                                <div className={css(styles.order)}>
                                    <p className={css(styles.orderDescription)}>{i.quantity + ' '}
                                        {i.name}</p>
                                </div>))
                            }
                            time={command.time}
                            status={command.status}
                        />
                    ))}
            </section>
        </main>
    )
}

const styles = StyleSheet.create({

    orderDescription: {
        margin: '0',
        textAlign: 'center',
    },

    kitchenMain: {
        fontFamily: ['Montserrat', 'sans-serif'],
        src: "url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap')",
        display: 'flex',
        flexDirection: 'row',
        padding: '1vw',
        justifyContent: 'center',
    },

    orderTitle: {
        textAlign: 'center',
        margin: '1vw 0 3vw 0',
        color: '#0C0804',
        borderColor: '#BBA250',
        borderStyle: 'dashed',
        fontSize: '2rem',
    },

    order: {
        display: 'flex',
        height: '2.7em',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },

    secPendingOrder: {
        marginRight: '2vw',
    },

    secDoneOrder: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
})

export default Kitchen