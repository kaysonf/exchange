import {useCallback, useState} from "react";

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
            return new Promise<ResponseBody>((resolve, reject) => {

                if (!url) reject('url cannot be empty');

                setLoading(true);

                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(req)
                })
                    .then(data => data.json())
                    .then(data => {
                        setData(data);
                        resolve(data);
                    })

                    .catch(err => {
                        setError(err);
                        reject(err);
                    })

                    .finally(() => setLoading(false));

            });

        }, []
    );

    return [
        {data, error, loading},
        makeRequest
    ];
}