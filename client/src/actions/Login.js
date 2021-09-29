
export async function login(user) {
    const response = await fetch('/api/auth/signin', {
        method: "POST",
        dataType: "JSON",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (response.ok) {
        return await response.json();
    } else {
        throw "Invalid username or password";
    }
}