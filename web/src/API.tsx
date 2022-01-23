import {useGetApi, usePostApi} from "./util/network/Http";
import {Market, OrderTicket, PositionM} from "../../domain/models/Trading";

const BASE_URL = 'http://localhost:5000';

/*
* get positions
* */
export const usePositionsApi = () => useGetApi<PositionM[]>(`${BASE_URL}/api/positions`);

export const useCreateOrderApi = () => usePostApi<OrderTicket, OrderTicket>(`${BASE_URL}/api/create`);

export const useMarketDataApi = () => useGetApi<Market[]>(`${BASE_URL}/api/market`);
