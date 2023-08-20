import jwt_decode from 'jwt-decode';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';
import baseURL from "../../assets/common/baseUrl";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

// export const loginUser = (user, dispatch) => {
//     fetch(`${baseURL}users/login`, {
//         method: "POST",
//         body: JSON.stringify(user),
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//         },
//     })
//         .then((res) => res.json())
//         .then((data) => {
//             console.log(typeof (data.token))
//             if (data) {
//                 // const token = JSON.stringify(data);
//                 const token = data.token;
//                 console.log(token === null ? "A" : token)
//                 // {token === null ? console.log(token) : console.log("ABCD")}
//                 AsyncStorage.setItem("jwt", token)
//                     .then(() => {
//                         const decoded = jwt_decode(data.token);
//                         dispatch(setCurrentUser(decoded, user));
//                         console.log("duu")
//                         console.log('Data saved successfully.');
//                     })
//             } else {
//                 logoutUser(dispatch);
//             }
//         })
//         .catch((err) => {
//             Toast.show({
//                 topOffset: 60,
//                 type: "error",
//                 text1: "Please  provide correct credentials",
//                 text2: ""
//             })
//             logoutUser(dispatch);
//         })
// };
export const loginUser = async (user, dispatch) => {
    try {
        const response = await fetch(`${baseURL}users/login`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        // console.log(typeof data.token);

        if (data) {
            const token = data.token;
            // console.log(token === null ? "A" : token);
            await AsyncStorage.setItem("jwt", token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded, user));
            // console.log("duu");
            console.log('Data saved successfully.');
        } else {
            logoutUser(dispatch);
        }
    } catch (err) {
        Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Please provide correct credentials",
            text2: ""
        });
        logoutUser(dispatch);
    }
};


// export const getUserProfile = (id) => {
//     fetch(`${baseURL}users/${id}`, {
//         method: "GET",
//         body: JSON.stringify(user),
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json"
//         },
//     })
//         .then((res) => res.json())
//         .then((data) => console.log(data));
// }

export const logoutUser = async (dispatch) => {
    try {
        await AsyncStorage.removeItem("jwt");
        console.log('Data removed successfully.');
        console.log(await AsyncStorage.getItem("jwt")); // This should now show null
        dispatch(setCurrentUser({}));
    } catch (error) {
        console.log('Error removing data:', error);
    }
};


export const setCurrentUser = (decoded, user) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
        userProfile: user
    }
}