import {useGetApi} from "../util/network/Http";
import {PositionM} from "../../../domain/models/Trading";
import {BASE_URL} from "./Config";

const usePositionsApi = () => useGetApi<PositionM[]>(`${BASE_URL}/api/positions`);

export default usePositionsApi;