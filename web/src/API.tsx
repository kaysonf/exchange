import {useGetApi} from "./util/network/Http";
import {PositionM} from "../../domain/models/Trading";
import {BASE_URL} from "./api/Config";

/*
* get positions
* */
export const usePositionsApi = () => useGetApi<PositionM[]>(`${BASE_URL}/api/positions`);

