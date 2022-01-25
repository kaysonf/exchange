import {Socket} from "socket.io-client";
import {useEffect, useState} from "react";
import {Market, OrderBookM} from "../../domain/models/Trading";

type WS_EVENT = 'order_book' | 'market';

function useWebSocket<MessageType>(socket: Socket, eventName: WS_EVENT) {
    const [status, setStatus] = useState<'connected' | 'disconnected' | null>(null);

    const [message, setMessage] = useState<MessageType | null>(null);

    useEffect(() => {
        socket.on('connect', () => setStatus('connected'));
        socket.on('disconnect', () => setStatus('disconnected'));

        socket.on(eventName, setMessage);

        return () => {
            socket.removeAllListeners('connect');
            socket.removeAllListeners('disconnect');
            socket.removeAllListeners(eventName)
        };
    }, []);

    return {status, message};
}

export const useOrderBookWS = (socket: Socket) => useWebSocket<OrderBookM>(socket, 'order_book');
export const useMarketWs = (socket: Socket) => useWebSocket<Market>(socket, 'market');