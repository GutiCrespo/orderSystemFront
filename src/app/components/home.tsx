'use client'

import { useEffect, useState } from "react";
import Order from "./order";
import phrasesData from "./click-phrases.json";

interface Order {
    id: number;
    state: "pending" | "in_progress" | "completed";
}

export default function Home() {

    const [orders, setOrders] = useState<Order[]>([])
    const [clickPhrase, setClickPhrase] = useState<string>("Add your first order")

    useEffect(() => {
        getOrders()
        getRandomPhrase()
    }, [])

    // GET orders from API
    async function getOrders(){
        try {
            const res = await fetch("http://localhost:4444/orders")
            const data = await res.json()
            console.log(`Requisição na API GET: resposta ${data}`); 
            
            setOrders(data)
            console.log(`Get feito com sucesso! ${orders}`)
        } catch (err) {
            console.error("Error fetching orders:", err)                
        }
    }
    
    // POST orders in API
    async function createOrder() {
        try {
            const res = await fetch("http://localhost:4444/orders", {
                method: "POST",
            })
            const data = await res.json()
            console.log(`Post feito com sucesso! ${data}`)
            getOrders()
            getRandomPhrase()
            
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
        }
    }

    // UPDATE order state in API
    async function updateOrder(id: number) {
        try {
            const res = await fetch(`http://localhost:4444/orders/${id}`, {
                method: "PUT",
            })

            const data: Order = await res.json();
            console.log(`Pedido ${id} atualizado!`, data);
            getOrders()
            
        } catch (error) {
            console.error(`Erro ao atualizar o pedido ${id}:`, error);
        }
    }

    function getRandomPhrase() {
        const randomNumber = Math.floor(Math.random() * phrasesData.phrases.length);
        console.log(randomNumber);
        setClickPhrase(phrasesData.phrases[randomNumber]);
    }

    return (
        <section className="max-w-5xl pt-8">
            <header className="HeroSection w-full flex items-center justify-center flex-col gap-4">
                <h1 className="text-[#050505] text-center font-bold text-3xl sm:text-5xl md:text-7xl">Create<span className="text-[#EA4E43]">,</span> Update <span className="text-[#0A85D1]">and</span> Filter<span className="text-[#FAA700]">!</span></h1>
                <h2 className="text-center text-base md:text-2xl sm:text-lg">Your personal Order Management System</h2>
                <button 
                        className="flex gap-2 bg-[#050505] px-3 py-1 text-[#ffffff] rounded-md items-center"
                        onClick={createOrder}>

                    {orders.length > 0 ?(
                        <>
                            <p className="text-sm sm:text-base md:text-lg ">{clickPhrase}</p>
                            <p className="">→</p>
                        </>
                    ) : (
                        <>
                            <p className="text-sm">Add your first order</p>
                            <p className="">→</p>
                        </>
                    )}
                </button>
            </header>

            <div className="Orders Painel mt-6 sm:flex sm:flex-col sm:items-center sm:justify-center">
                <div className="bg-[#F6F5F4] rounded-xl min-h-32 h-fit p-4 flex flex-col gap-4 sm:px-10 sm:w-10/12">
                    {orders.length > 0 ? (
                        orders.map((order) => 
                            <Order key={order.id} order={order} updateOrder={updateOrder}/>)
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-2">
                            <p className="text-base opacity-30">Creates your first order:</p>
                            <button 
                                    className="flex gap-2 px-3 text-[#050505] py-1 rounded-md items-center opacity-30"
                                    onClick={createOrder}>
                                <p className="text-2xl">+</p>
                            </button>
                        </div>
                    )} 
    
                </div>
            </div>
        </section>
    );
}
