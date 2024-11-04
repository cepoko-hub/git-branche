function submitRequest() {
    alert("votre requete a bien etait envoyé");
}

let isAuthenticated = false;

async function handleAuth() {
    if (isAuthenticated) {
        logout();
    } else {
        const pseudo = prompt("Veuillez entrer votre pseudo :");
        const password = prompt("Veuillez entrer votre mot de passe :");
        if (pseudo && password) {
            const users = await fetchUsers();
            const user = users.find(u => u.pseudo === pseudo);

            if (user) {
                if (user.password === password) {
                    alert("Connecté !");
                    setAuthenticatedState(true);
                } else {
                    alert("Erreur de mot de passe.");
                }
            } else {
                const createAccount = confirm("Le pseudo n'existe pas. Voulez-vous créer un compte ?");
                if (createAccount) {
                    await addUser(pseudo, password);
                    alert("Compte créé et connecté !");
                    setAuthenticatedState(true);
                }
            }
        }
    }
}

async function fetchUsers() {
    const response = await fetch('asset/data,base.json');
    return response.json();
}

async function addUser(pseudo, password) {
    const users = await fetchUsers();
    users.push({ pseudo, password });

    console.warn("Impossible d'écrire dans un fichier JSON en local sans serveur.");

    console.log("Nouvel utilisateur ajouté : ", { pseudo, password });
}

function setAuthenticatedState(authenticated) {
    isAuthenticated = authenticated;
    const authButton = document.getElementById('auth-button');
    authButton.textContent = authenticated ? 'Log out' : 'Sign in';
}

function logout() {
    setAuthenticatedState(false);
    alert("Déconnecté !");
}
