import { baseUrl } from "../variables.js";

async function getUser(userName) {
    const response = await fetch(`${baseUrl}${userName}`);
    const pag = baseUrl+userName;
    fetch(pag) ? console.log('existe'):console.log('não existe');
    return await response.json();
}

export {getUser};