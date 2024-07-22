import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {faker} from "@faker-js/faker";

//Development only
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration)
    })
};


const albumsApi = createApi({
    reducerPath: 'albums', //where in big state this will be tied to
    baseQuery: fetchBaseQuery({
            baseUrl: 'http://localhost:3005',
            //remove for Production, fake loading
            fetchFn: async (...args) => {
                await pause(1000);
                return fetch(...args);
            }
    }), //where request is being sent
    endpoints(builder) {
        return {
            removeAlbum:builder.mutation({
                //invalidates data with tag Album after running delete query using albums userID to delete album
                invalidatesTags:(result, error, album) => {
                    return [{type: 'Album', id: album.id}];
                },
                query: (album) => {
                    return {
                        url: `/albums/${album.id}`,
                        method: 'DELETE',
                    };
                },
            }),
            addAlbum: builder.mutation({
                //invalidates all Tags of 'Albums' and forces a re-query of data
                //for only specific user
                invalidatesTags: (result, error, user) => {
                    return [{type: 'UsersAlbums', id: user.id}]
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
                   const tags = result.map(album => {
                       return {type: 'Album', id:album.id}
                   });
                   tags.push({type: 'UsersAlbums', id: user.id});
                   return tags;
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

export const { useFetchAlbumsQuery , useAddAlbumMutation, useRemoveAlbumMutation} = albumsApi;
export {albumsApi};