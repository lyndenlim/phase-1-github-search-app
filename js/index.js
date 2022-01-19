fetch("https://api.github.com/search/users?q=octocat")
.then(resp => resp.json())
.then(data => {
    const form = document.querySelector("#github-form")
    const userNameLi = document.createElement("li")
    const avatarImg = document.createElement("img")
    const gitHubLinkA = document.createElement("a")
    form.addEventListener("submit", e => {
        e.preventDefault()
        const inputFieldValue = e.target[0].value
        const gitData = data.items
        const userList = document.querySelector("#user-list")
        for (user in gitData){
            if (gitData[user].login === inputFieldValue){
                let userName = gitData[user].login
                let avatar = gitData[user].avatar_url
                let gitHubLink = gitData[user].url                
                
                userNameLi.textContent = userName
                avatarImg.src = avatar
                gitHubLinkA.href = gitHubLink
                gitHubLinkA.textContent = gitHubLink
                userList.append(userNameLi, avatarImg, gitHubLinkA)
                handleUserNameClick(userName)

            } else {
                continue
            }
        }
        form.reset()
    })

    function handleUserNameClick(userName){
        document.querySelector("#user-list li").addEventListener("click", e => {
            return fetch(`https://api.github.com/users/${userName}/repos`)
            .then(resp => resp.json())
            .then(data => data.forEach(repo => {
                const repoList = document.querySelector("#repos-list")
                const createLi = document.createElement("li")
                const createA = document.createElement("a")
                createA.href = repo.html_url
                createA.textContent = repo.html_url
                createLi.appendChild(createA)
                repoList.appendChild(createLi)
            }))
        })
    }
})