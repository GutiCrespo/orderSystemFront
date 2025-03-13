interface OrderProps {
    order: {
        id: number;
        state: "pending" | "in_progress" | "completed";
    }
    updateOrder: (id: number) => void
}

export default function Order({order, updateOrder}: OrderProps) {

    let currentState = order.state
    let colorButton = ""
    let textButton = ""
    let textButtonOpacity = ""
    
    switch (currentState) {
        case "pending":
            colorButton = "border-[#EA4E43]"
            textButton = "start"
            break;
            case "in_progress":
                colorButton = "border-[#0A85D1]"
                textButton = "finish"
            break;
            case "completed":
                colorButton = "border-[#FAA700] opacity-30"
                textButton = "done"
                textButtonOpacity = "opacity-50"
            break;
        default:
            break;
    }

    
    return (
        <div className="flex w-full justify-between">
                <p className="Index">{order.id}</p>
                {/* <div className=""> <p className={`bg-[#ffffff] px-3 py-1 text-[#050505] rounded-md border ${colorButton}`}>{order.state}</p></div> */}
                <button 
                    className={`text-center bg-[#ffffff] px-3 py-1 text-[#050505] rounded-md border ${colorButton}`}
                    onClick={() => updateOrder(order.id)}
                    disabled={order.state === "completed"}
                    >
                        {order.state}
                </button>
                <button 
                    className={`text-right ${textButtonOpacity}`}
                    onClick={() => updateOrder(order.id)}
                    disabled={order.state === "completed"}
                    >
                        {textButton}
                </button>
            </div>
        );
    }