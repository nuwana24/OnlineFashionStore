export const signup = user => (
    fetch("http://localhost:5000/api/users", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    })
);

export const login = user => (
    fetch("http://localhost:5000/api/session", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    })
);

export const logout = () => (
    fetch("http://localhost:5000/api/session/", {method: "DELETE"})
);

export const getUSer =id => (
    fetch("http://localhost:5000/api/session",{
        method:"GET",
        body:id
    })
);
export const checkLoggedIn = async () => {
    const response = await fetch('http://localhost:5000/api/session');
    const { user } = await response.json();
    let preloadedState = {};
    if (user) {
        preloadedState = {
            session: user
        };
    }
    return preloadedState;
};