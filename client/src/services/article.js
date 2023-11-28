import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

  


const ApiKey = import.meta.env.VITE_ARTICLE_API_KEY;
const ApiHost = import.meta.env.VITE_ARTICLE_API_HOST;


export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
    
        prepareHeaders : (headers) => {
            headers.set('X-RapidAPI-Key',ApiKey);
            headers.set('X-RapidAPI-Host',ApiHost);

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: (params) => `summarize?url=${encodeURIComponent(params.articleUrl)}`
        }),
    }),
})
console.log(articleApi.headers)
export const { useLazyGetSummaryQuery } = articleApi;