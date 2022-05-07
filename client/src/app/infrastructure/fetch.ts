interface IOptions {
    method: string;
    body?: any;
    headers?: any;
}

const isPostMethod = (opt: IOptions) => opt.method === "POST";

export const customFetch = (path: string, options: IOptions) => 
    fetch(`/api/${path}`, {
        method: options.method,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        body: isPostMethod(options) ? JSON.stringify(options.body) : undefined
    })
    .then(data => data.json());