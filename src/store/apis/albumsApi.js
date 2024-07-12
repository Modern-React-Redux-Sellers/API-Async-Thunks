import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {faker} from "@faker-js/faker";

const albumsApi = createApi({
    reducerPath: 'albums', //where in big state this will be tied to
    baseQuery: fetchBaseQuery({
            baseUrl: 'http://localhost:3005'
    }), //where request is being sent
    endpoints(builder) {
        return {
            addAlbum: builder.mutation({
                //invalidates all Tags of 'Albums' and forces a re-query of data
                //for only specific user
                invalidatesTags: (result, error, user) => {
                    return [{type: 'Album', id: user.id}]
                },
                query: (user) => {
                    return {
                        url: '/albums',
                        method: 'POST',
                        body: {
                            userId: user.id,
                            title: faker.commerce.productName()
                        }
                    };
                }
            }), //end addAlbum
            //fetchAlbums creates hook: useFetchAlbumsQuery
            fetchAlbums: builder.query({
                //used as a reference to mark outOfDate data when adding new album
                //for specific user
                providesTags: (result, error, user) => {
                    return [{type: 'Album', id: user.id}];
                },
                query: (user) => {
                    return {
                      url: '/albums',
                      params: {
                          userId: user.id
                        },
                      method:'GET'
                    };
                },
            }),//end fetchAlbums
        };
    }
});

export const { useFetchAlbumsQuery , useAddAlbumMutation} = albumsApi;
export {albumsApi};