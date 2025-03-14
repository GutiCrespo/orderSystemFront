'use client'

import { useEffect, useState } from "react";
import Order from "./order";
import phrasesData from "./click-phrases.json"
import FilterModal from "./modalFilter";

interface Order {
    id: number;
    state: "pending" | "in_progress" | "completed";
}

export default function Home() {

    const [orders, setOrders] = useState<Order[]>([])
    const [clickPhrase, setClickPhrase] = useState<string>("Add your first order")
    const [isModalOpen, setIsModalOpen] = useState(false)
    
    //  Filters:
    const [isFilterOn, setIsFilterOn] = useState(false)
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
    const [currentFilterState, setCurrentFilterState] = useState<string | undefined>(undefined);
    const [currentFilterId, setCurrentFilterId] = useState<number | undefined>(undefined);


    
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    
    useEffect(() => {
        if (typeof window !== "undefined") {
            getOrders();
            getRandomPhrase();
            console.log("API URL:", apiUrl);
        }
    }, []);
    
    // GET orders from API
    async function getOrders(){
        try {
            // Test to debug:
            const res = await fetch("http://localhost:4444/orders");
            // const res = await fetch(`${apiUrl}/orders`)
            
            const data = await res.json()
            console.log(`Requisição na API GET: resposta ${data}`); 
            
            setOrders(data)
            console.log(`Get success! ${orders}`)
            setIsFilterOn(false)
        } catch (err) {
            console.error("Error fetching orders:", err)                
        }
    }
    
    // POST orders in API
    async function createOrder() {
        try {
            const res = await fetch(`${apiUrl}/orders`, {
                method: "POST",
            })
            const data = await res.json()
            console.log(`Post success! ${data}`)
            getOrders()
            getRandomPhrase()
            
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    async function updateOrder(id: number) {
        try {
            const res = await fetch(`${apiUrl}/orders/${id}`, {
                method: "PUT",
            });
    
            const data: Order = await res.json();
            console.log(`Order ${id} updated!`, data);
            
            if (orders.length <=1 ){
                console.log(orders.length);
                getOrders();
            }
            if (isFilterOn) {
                console.log("Filter active");
                filterOrders(currentFilterState, currentFilterId)
            } else {
                getOrders();
                console.log("Filter off");
            }
        } catch (error) {
            console.error(`Error updating order ${id}:`, error);
        }
    }

    // DELETE all orders 
    async function handleDeleteAll() {
        try {
            const res = await fetch(`${apiUrl}/orders/delete-all`, {
            method: "DELETE",
            })

            if (!res.ok) {
                throw new Error("Failed to delete all orders");
            }
            
            console.log(`Orders deleted! ${res}`);
            getOrders()
            
        } catch (error) {
            console.error("Error deleting orders:", error);
        }
    }

    // Generate and displays random phrases in the "add button"
    function getRandomPhrase() {
        const randomNumber = Math.floor(Math.random() * phrasesData.phrases.length);
        console.log(randomNumber);
        setClickPhrase(phrasesData.phrases[randomNumber]);
    }

    async function filterOrders(filterState?:string, filterId?: number) {
        try {
            let url = `${apiUrl}/orders/filter`

            setCurrentFilterState(filterState)
            setCurrentFilterId(filterId)

            // Logic to apply the filters inside the requisition.
            // "?id=[num]", if it is filter by id
            // "?state=[state]", if it is filter by state
            // "?state=[state]&id=[num]", with the "state" first, to filter using both
            if (filterState || filterId) {
                url += "?"
                if (filterState) {url += `state=${filterState}`} 
                if (filterState && filterId) {url += `&`} 
                if (filterId) {url += `id=${filterId}`} 
            }
            const res = await fetch(url);
            const data: Order[] = await res.json();
            setOrders(data);
            console.log("Filtered orders:", data);
            setIsFilterOn(true);
        } catch (error) {
            console.error("Error filtering the orders:", error);
        }
        
    }

    return (
        <section className="max-w-5xl pt-8">
            <header className="HeroSection w-full flex items-center justify-center flex-col gap-4">
                <h1 className="text-[#050505] text-center font-bold text-3xl sm:text-5xl md:text-7xl">Create<span className="text-[#EA4E43]">,</span> Update <span className="text-[#0A85D1]">and</span> Filter<span className="text-[#FAA700]">!</span></h1>
                <h2 className="text-center text-base md:text-2xl sm:text-lg">Your personal Order Management System</h2>
                <div className="flex items-center justify-center gap-4 sm:mt-6">
                    <button 
                            className="flex gap-2 bg-[#050505] px-3 py-1 text-[#ffffff] rounded-md items-center"
                            onClick={createOrder}>

                        {orders.length > 0 ?(
                            <>
                                <p className="text-sm sm:text-base md:text-lg ">{clickPhrase}</p>
                            </>
                        ) : (
                            <>
                                <p className="text-sm sm:text-base md:text-lg ">Add your first order</p>
                                <p className="">→</p>
                            </>
                        )}
                    </button>

                    {/* Filters button only appears if there is an order to filter  */}
                    {orders.length > 0 && (
                            <button 
                                    className="flex gap-2 px-3 py-1 text-[#050505] rounded-md items-center"
                                    onClick={() => setIsFilterModalOpen(true)}
                                    >
                                    <p className="text-sm underline sm:text-base md:text-lg">Filters</p>
                            </button>   
                    )}
                </div>
            </header>

            <div className="Orders Painel mt-6 sm:flex sm:flex-col sm:items-center sm:justify-center">
                <img
                        src="/illustrationAsset.png" 
                        alt="Illustration of Order System"
                        className="w-full max-w-28 sm:max-w-36 md:max-w-56 mx-auto relative top-2 sm:top-2 md:top-2"
                    />
                <div className="bg-[#F6F5F4] rounded-xl min-h-32 h-fit p-4 flex flex-col justify-center items-center gap-4 sm:px-10 sm:w-10/12">
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
                
                {isFilterOn && (
                    <button 
                            className=" mt-4 flex gap-2 px-3 py-1 text-[#050505] rounded-md items-center opacity-50"
                            onClick={() => getOrders()}
                            >
                            <p className="text-xs sm:text-sm md:text-base">Clear filters</p>
                    </button>
                )}
                </div>
            </div>

            {orders.length > 4 && (
                            
                            <div className="w-full flex flex-col items-center">
                                <button 
                                    className=" mt-4 flex gap-2 px-3 py-1 text-[#050505] rounded-md items-center opacity-50"
                                    onClick={() => handleDeleteAll()}
                                    >
                                    <p className="text-xs sm:text-sm md:text-base">Clear orders</p>
                                </button>
                            </div>
            )}

            {/* Filter modal */}
            <FilterModal 
                isOpen={isFilterModalOpen} 
                onClose={() => setIsFilterModalOpen(false)} 
                onApplyFilter={filterOrders}
            />
        </section>
    );
}
