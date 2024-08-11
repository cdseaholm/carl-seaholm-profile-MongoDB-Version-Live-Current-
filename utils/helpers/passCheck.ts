


export async function PassCheck(password: string, email: string, urlToUse: string) {
    console.log('urlToUse: ', urlToUse);
    const response = await fetch(`${urlToUse}/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: password, email: email }),
    });
    if (!response.ok) {
        return false;
    }
    const data = await response.json();

    return data;
}