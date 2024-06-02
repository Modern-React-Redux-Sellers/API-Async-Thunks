import {useCallback, useState} from "react";
import {useDispatch} from "react-redux";


export const useThunk = (thunk) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const runThunk = useCallback((arg) => {
        setIsLoading(true);
        dispatch(thunk(arg)).unwrap()
            .catch(err => setError(err))
            .finally(() => setIsLoading(false));
    }, [dispatch, thunk]);

    //returns a working thunk thats been called, loading state, and error state
    return [runThunk, isLoading, error];
}

