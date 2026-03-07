import { env } from "process";

const API_URL = env.API_URL;

interface ServiceOptions {
    cache?: RequestCache
    revalidate?: number
}

interface GetBlogsParams {
    isFeatured?: boolean;
    search?: string;
}

export const blogService = {
    getBlogPosts: async function (params?: GetBlogsParams, options?: ServiceOptions ) {
        try {
            const url = new URL(`${API_URL}/posts`);
            // console.log(Object.entries(params))
            // url.searchParams.append('key', 'value');

            
            if(params){
                Object.entries(params).forEach(([key, value])=>{
                    if(value !== undefined && value !== null && value !== ""){
                        url.searchParams.append(key, value)
                    }
                })
            }
            // console.log(url.toString());
            const config: RequestInit = {};

            if(options?.cache){
                config.cache = options.cache;
            }

            if(options?.revalidate){
                config.next = { revalidate: options.revalidate};
            }

            const res = await fetch(url.toString()
                // {next: {revalidate: 10}, }

            );
            const data = await res.json();

            return {data: data, error: null};
        } catch (error) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    },

    getBlogById: async function (id: string){
        try {
            const res = await fetch(`${API_URL}/posts/${id}`);
            const data = await res.json();
            return { data: data, error: null};
        } catch (error) {
            return { data: null, error: { message: "something went wrong"}};
        }
    }
}