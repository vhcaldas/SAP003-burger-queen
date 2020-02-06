import React, { useEffect, useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db } from '../Utils/firebaseUtil.js';
import CardDelivery from '../Components/CardDelivery'

const Delivery = () => {

    const [orderDone, setOrderDone] = useState([]);

    useEffect(() => {
        displayDoneOrders();
    }, []);

    const displayDoneOrders = () => {
        db.collection("Pedidos")
            .where("status", "==", 'Pronto')
            .onSnapshot(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    const findOrders = querySnapshot.docs.map((showOrder) => ({
                        id: showOrder.id,
                        ...showOrder.data(),
                    }))
                    setOrderDone(findOrders)
                });
            });
    }

    const updateCollection = (command) => {

        if (command.status === 'Pronto') {
            command.status = 'Entregue';
            db.collection("Pedidos")
                .doc(command.id)
                .update({
                    status: "Entregue",
                    endTime: new Date().toLocaleString('pt-BR')
                });
        }

    }

    return (
        <div>
            <main className={css(styles.mainDelivery)}>
                <h1 className={css(styles.orderDoneTitle)}>Pedidos Concluídos</h1>
                <section className={css(styles.doneOrdersSection)}>
                    {
                        orderDone.map((command) => (
                            <div className={css(styles.cardsDiv)}>
                                <CardDelivery
                                    name={command.name}
                                    desk={command.table}
                                    order={command.order.map((i) => (
                                        <p className={css(styles.order)}>{i.quantity + ' '}
                                            {i.name}</p>))
                                    }
                                    time={command.time}
                                    endTime={command.endTime}
                                    changeStatus={
                                        (event) => {
                                            event.preventDefault();
                                            updateCollection(command);
                                        }
                                    }
                                    title={'Entregue!'}
                                />
                            </div>
                        ))}
                </section>
            </main>
        </div>
    )
}

const styles = StyleSheet.create({
    mainDelivery: {
        fontFamily: ['Montserrat', 'sans-serif'],
        src: "url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap')",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1vw',
    },

    orderDoneTitle: {
        fontSize: '1.5rem',
    },

    cardsDiv:{
        display: 'flex',
        flexWrap: 'wrap',
    },

    doneOrdersSection: {
        display: 'flex',
        flexFlow: ['row', 'wrap'],
        justifyContent: 'center',
    },
})


export default Delivery;