const tokenRefreshURL = 'http://localhost:8000/api/token/refresh/';

export async function fetchWithAuth(url, options = {}){
    let access = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');
    
    options.headers = {
        ...(options.headers || {}),
        Authorization: `Bearer ${access}`,
        'Content-Type' :'application/json',
    };
    let result = await fetch(url, options);
    
    if (result.status === 401 && refresh){
        const refreshResult = await fetch(tokenRefreshURL, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({refresh}),
        });

        if(refreshResult.ok){
            const data = await refreshResult.json();
            localStorage.setItem('access', data.access);
            options.headers.Authorization = `Bearer ${data.access}`;
            result = await fetch(url, options);
        }else{
            localStorage.clear();
            window.location.href = '/';
        }
    }
    return result
}