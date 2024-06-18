import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const albumsApi = createApi({
    reducerPath: 'albums', //where in big state this will be tied to
    baseQuery: fetchBaseQuery({
            baseUrl: 'http://localhost:3005'
    }), //where request is being sent
    endpoints(builder) {
        return {
            fetchAlbums: builder.query({
                query: (user) => {
                    return {
                      url: '/albums',
                      params: {
                          userId: user.id
                        },
                      method:'GET'
                    };
                },
            }),
        };
    }
});

export const { useFetchAlbumsQuery } = albumsApi;
export {albumsApi};