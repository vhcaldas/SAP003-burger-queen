import React, { useEffect, useState } from 'react';
import { db } from '../Utils/firebaseUtil.js';
import { StyleSheet, css } from 'aphrodite';
import CardPendingOrder from '../Components/CardPendingOrder';
import CardDoneOrder from '../Components/CardDoneOrder';

const Kitchen = () => {

    const [orderDone, setOrderDone] = useState([]);
    const [orderPending, setOrderPending] = useState([]);


    useEffect(() => {
        displayOrders('Pendente', setOrderPending);
        displayOrders('Pronto', setOrderDone)
    }, []);

    const displayOrders = (status, state) => {
        db.collection("Pedidos")
            .where("status", "==", status)
            .onSnapshot(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    const findOrders = querySnapshot.docs.map((showOrder) => ({
                        id: showOrder.id,
                        ...showOrder.data(),
                    }))
                    state(findOrders)
                });
            });
    }

    const updateStatus = (command) => {
        if (command.status === 'Pendente') {
            command.status = 'Pronto';
            db.collection("Pedidos")
                .doc(command.id)
                .update({
                    status: "Pronto",
                    endTime: new Date().toLocaleString('pt-BR'),
                    getEndTime: new Date().getTime(),
                });
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
                                <p className={css(styles.order)}>{i.quantity + ' '}
                                    {i.name}</p>
                            ))
                            }
                            time={command.time}
                            status={command.status}
                            changeStatus={
                                (event) => {
                                    event.preventDefault();
                                    updateStatus(command)
                                }
                            }
                            title={'Pronto!'}
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
                                <p className={css(styles.order)}>{i.quantity + ' '}
                                    {i.name}</p>))
                            }
                            time={command.time}
                            endTime={command.endTime}
                        />
                    ))}
            </section>
        </main>
    )
}

const styles = StyleSheet.create({

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
        width: 'max-content',
        color: '#0C0804',
        borderColor: '#BBA250',
        borderStyle: 'dashed',
        fontSize: '1.5rem',
        padding: '1vw',
    },

    order: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        margin: '0.5vw',
    },

    secPendingOrder: {
        marginRight: '2vw',
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    secDoneOrder: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '50%',
    },
})

export default Kitchen