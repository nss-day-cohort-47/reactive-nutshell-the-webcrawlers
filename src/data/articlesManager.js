const remoteURL = "http://localhost:8088"

// fetch calls used to grab data 
export const getAllArticles = () => {
    return fetch(`${remoteURL}/articles`)
        .then(result => result.json())
}

export const deleteArticle = (id) => {
    return fetch(`${remoteURL}/articles/${id}`, {
        method: "DELETE"
    }).then(result => result.json())
}

export const getArticleById = (id) => {
    return fetch(`${remoteURL}/articles/${id}?_expand=user`)
        .then(res => res.json())
}

export const addArticle = (newArticle) => {
    return fetch(`${remoteURL}/articles`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newArticle)
    }).then(response => response.json())
}

export const updateArticle = (editedArticle) => {
    return fetch(`${remoteURL}/articles/${editedArticle.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedArticle)
    }).then(data => data.json());
}