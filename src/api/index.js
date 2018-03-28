
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json',

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
    fetch(`${api}/mongoCalls/login`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
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
    fetch(`${api}/mongoCalls/signup_mongodb`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(details)
    }).then((res) => res.json())
        .then((data) => {return data;})
        .catch(error => {
            console.log("This is error");
            return error;
        });



export const logout = (payload) =>
    fetch(`${api}/users/logout`,{
        method: 'POST',
        headers:{
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then((res) => res.json())
        .then((data) => {
            return data;
        }).catch(error=> {
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
        credentials: 'include',
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
         credentials: 'include',
         })
         .then((res) => res.json())
    .then((data) => {
        return data;
    }).catch(error=> {
        console.log("This is error");
        return error;
    });


export const postProject = (projectdetails) =>
    fetch(`${api}/kafka/kafkaProducer/postproject`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(projectdetails)
    }).then((res) => res.json())
        .then((data) => {return data;})
        .catch(error => {
            console.log("This is error");
            return error;
        });



export const fetchProjects = () =>
    fetch(`${api}/mongoCalls/getProjectsByUser`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            return data
                ;})
        .catch(error => {
            console.log("This is error in fetch projects");
            return error;
        });


export const editUpdateProfile = (userdata) =>
    fetch(`${api}/users/editUpdateProfile`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(userdata)
    }).then((res) => res.json())
        .then((data) => {return data;})
        .catch(error => {
            console.log("This is error while updating profile");
            return error;
        });


export const fetchUserProfile = () =>
    fetch(`${api}/users/getUserProfile`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            return data
                ;})
        .catch(error => {
            console.log("This is error in fetch user Profile");
            return error;
        });

export const fetchAllProjects = () =>
    fetch(`${api}/kafka/kafkaProducer/getAllProjects`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    }).then((res) => res.json())
        .then((data) => {
           // console.log(data);
            return data
                ;})
        .catch(error => {
            console.log("This is error in fetch projects");
            return error;
        });



export const fetchProjectDetails = (projectdata) =>
    fetch(`${api}/users/getProjectDetails`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(projectdata)
    }).then((res) => res.json())
        .then((data) => {return data;})
        .catch(error => {
            console.log("This is error while updating profile");
            return error;
        });

export const postBid = (projectdetails) =>
    fetch(`${api}/users/postBid`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(projectdetails)
    }).then((res) => res.json())
        .then((data) => {return data;})
        .catch(error => {
            console.log("This is error");
            return error;
        });



export const fetchBidInfo = (projectdetails) =>
    fetch(`${api}/users/getBidInfo`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(projectdetails)
    }).then((res) => res.json())
        .then((data) => {
            console.log("in bids then " +data);
            return data
                ;})
        .catch(error => {
            console.log("This is error in fetch Bid info");
            return error;
        });