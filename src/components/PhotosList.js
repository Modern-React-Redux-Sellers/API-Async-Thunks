import { useFetchPhotosQuery} from "../store";


const PhotosList = ({album}) => {
    useFetchPhotosQuery(album);

    return 'PhotosList'
}

export default PhotosList;