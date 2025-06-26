baseURL: "http://localhost:8000/api/";

export async function login_user(credentials) {
    const response = await fetch("http://localhost:8000/api/token/",{
        method: 'POST',
        headers: { 'Content-Type':'application/json'},
        body: JSON.stringify(credentials)

    });
    const data = await response.json();
    if (response.ok){
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
    }
    return data
    
}