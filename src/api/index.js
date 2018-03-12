
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json'
};

// export default function fetchMenu() {
//
//     return  dispatch => {
//         axios.post("http://localhost:3000/")
//             .then((res)=>{
//                 const data = res.data.food.map(food => {
//                     return food
//                 });
//                 dispatch((data))
//             });
//     }
// }


export const doLogin = (payload) =>
    fetch(`${api}/users/doLogin`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then((res) => res.json())
        .then((data) => {
            const token = data.token;
            localStorage.setItem('jwtToken', token);
            console.log(token);
            return data;})
        .catch(error => {
            console.log("This is error");
            return error;
        });

//     .then(res => {
//     //return res.status;
//     return res;
// }).catch(error => {
//     console.log("This is error");
//     return error;
// });

export const saveData = (details) =>
    fetch(`${api}/users/saveData`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(details)
    }).then((res) => res.json())
        .then((data) => {return data;})
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const fetchData = (payload) =>
    fetch(`${api}/users/getUserData`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

 export const checkSession = () =>
     fetch(`${api}/users/redirectToHomepage`,{
         method: 'GET',
         headers:{
             ...headers,
             'Content-Type': 'application/json'
         },
         }).then(res=> {
         return res;
     }).catch(error=> {
         console.log("This is error");
         return error;
     });
