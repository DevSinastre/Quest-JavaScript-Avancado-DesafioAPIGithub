const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML =
            `
            <div class="info">
                <img src="${user.avatarUrl}" alt="foto do perfil do usuário">
                <div classs="data">
                    <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                    <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
                    <div class="follow">
                        <i>🤜🏼🤛🏼</i>
                        <hr>
                        <ul>
                            <li><strong>Seguidores:</strong> ${user.followers}</li>
                            <li><strong>Seguindo:</strong> ${user.following}</li>
                        </ul>
                    </div>
                </div>
            </div>
        `

        let repositoriesItens = '';
        user.repositories.forEach(repo =>{
            let language = '';
            repo.language === 'JavaScript' ? language = 'JS': language = repo.language;
            
            repositoriesItens += 
            `
                <li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                    <div class="infos">
                        <span>🍴${repo.forks_count}</span><span>✨${repo.stargazers_count}</span><span>🧐${repo.watchers_count}</span><span>💻${language}</span>
                    </div>
                </li>
                
            `
        }
            
        );

        if (repositoriesItens.length > 0) {
            this.userProfile.innerHTML +=
                `
                <div class="repositories section">
                    <h2>Repositórios</h2>
                    <ul>
                        ${repositoriesItens};
                    </ul>
                </div>
            `
        }

        let eventItens = '';
        user.events.forEach(evento => {
            let messageIndex = evento.payload.commits;
            let messageRepository = '';
            
            if (messageIndex) {
                
                messageRepository = `<span>${messageIndex[0].message}</span>`
            }
            else {
                
                messageRepository = `<span>Não possui mensagem nesse commit</span>`
            }
            eventItens +=
                `
                <li class="li-events">
                    <div class="li-left">
                        <span><strong>${evento.repo.name}</strong></span>
                    </div>
                    <div>
                        <span>${messageRepository}</span>
                    </div>
                    </li>
                    <hr>
            `
        });

        if (eventItens.length > 0) {
            this.userProfile.innerHTML +=
                `
                <h2>Eventos</h2><br><br>
                <div class="itens">
                    <p><strong>Repositório</strong></p>
                    <p><strong>Mensagem</strong></p>
                </div>
                <br>
                <ul>${eventItens}</ul>
            `
        }
    },

    renderNotFound() {
        this.userProfile.innerHTML = `<h1>Usuário não encontrado</h1>`
    }
}

export { screen }