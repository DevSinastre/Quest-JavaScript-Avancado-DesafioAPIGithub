import { getUser } from "./services/user.js";
import { getRepositories } from "./services/respositories.js";
import { getEvents } from "./services/events.js";

import { user } from "./objects/user.js";
import { screen } from "./objects/screen.js";

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value;
    if(!validateEmptyInput(userName)) getUserData(userName);
})

document.getElementById('input-search').addEventListener('keydown', (e) => {
    if (e.key == "Enter") {
        const userName = document.getElementById('input-search').value;
        if(!validateEmptyInput(userName)) getUserData(userName);
    }
})

function validateEmptyInput(userName){
    if(userName.length === 0){
        alert('Preencha o campo com um nome de usuário do gitHub');
        return true;
    }
}

async function getUserData(userName) {

    const userResponse = await getUser(userName);

    if(userResponse.message){
        screen.renderNotFound();
        return;
    }
    
    const repositoriesResponse = await getRepositories(userName)

    const eventsResponse = await getEvents(userName);
    console.log(repositoriesResponse);

    user.setInfo(userResponse);
    user.setRepositories(repositoriesResponse);    
    user.setEvents(eventsResponse);

    screen.renderUser(user);
}