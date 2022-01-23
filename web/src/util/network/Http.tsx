import {useCallback, useState} from "react";

type FetchMethod =
    | { method: 'GET' }
    | { method: 'POST', body: unknown }

function fetchClient<ResponseBody> (url: string, fetchType: FetchMethod): Promise<ResponseBody> {

    const handleInitialRes = async (res: Response): Promise<ResponseBody> => {

        if (res.status !== 200) {
            const err = await res.json();

            if ('error' in err) {
                throw Error(err.error);
            } else {
                throw Error(err)
            }
        }

        return await res.json();
    }

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    switch (fetchType.method) {
        case 'POST':
            return fetch(url,{method: 'POST', body: JSON.stringify(fetchType.body), headers}).then(handleInitialRes);
        case 'GET':
            return fetch(url, {method: 'GET', headers}).then(handleInitialRes);
    }
}


type ResError = string | null;

type HttpHook<ResponseBody> = {
    data: ResponseBody | null;
    error: ResError
    loading: boolean
}

type PostHook<RequestBody, ResponseBody> = [HttpHook<ResponseBody>, (req: RequestBody) => Promise<ResponseBody>];

export function usePostApi<RequestBody, ResponseBody>(url: string): PostHook<RequestBody, ResponseBody> {

    const [data, setData] = useState<ResponseBody | null>(null);
    const [error, setError] = useState<ResError>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const makeRequest = useCallback(
        (req: RequestBody) => {
            return new Promise<ResponseBody>(async (resolve, reject) => {

                if (!url) reject('url cannot be empty');

                setLoading(true);

                fetchClient<ResponseBody>(url, {method: 'POST', body: req})

                    .then((data) => {
                        setData(data);
                        resolve(data);
                    })

                    .catch((err) => {
                        setError(err);
                        reject(err);
                    })

                    .finally(() => setLoading(false));

            });

        }, [setLoading, setError, setData, url]
    );

    return [
        {data, error, loading},
        makeRequest
    ];
}

type GetHook<ResponseBody> = [HttpHook<ResponseBody>, () => Promise<ResponseBody>];

export function useGetApi<ResponseBody>(url: string): GetHook<ResponseBody> {

    const [data, setData] = useState<ResponseBody | null>(null);
    const [error, setError] = useState<ResError>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const makeRequest = useCallback(
        () => {
            return new Promise<ResponseBody>(async (resolve, reject) => {

                if (!url) reject('url cannot be empty');

                setLoading(true);

                fetchClient<ResponseBody>(url, {method: 'GET'})

                    .then((data) => {
                        setData(data);
                        resolve(data);
                    })

                    .catch((err) => {
                        setError(err);
                        reject(err);
                    })

                    .finally(() => setLoading(false));

            });

        }, [setLoading, setError, setData, url]
    );

    return [
        {data, error, loading},
        makeRequest
    ];
}