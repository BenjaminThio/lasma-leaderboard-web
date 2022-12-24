import {useAppDispatch, useAppSelector} from "../app/hooks";
import {useEffect} from "react";
import {
    fetchUserData,
    userDataSelector,
    UserDataStatus,
    userErrorSelector,
    userStatusSelector
} from "../app/reducers/userDataSlice";

const useUserData = () => {
    const userData = useAppSelector(userDataSelector);
    const userStatus = useAppSelector(userStatusSelector);
    const userError = useAppSelector(userErrorSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userStatus === UserDataStatus.IDLE) {
            dispatch(fetchUserData());
            return;
        }

        if (userStatus === UserDataStatus.ERROR) {
            console.error(userError);
            return;
        }
    }, [userStatus]);

    return [userData, userStatus, userError]
};

export default useUserData;
