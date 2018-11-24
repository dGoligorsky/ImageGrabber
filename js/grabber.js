const accessToken = config.accessToken
const apiURL = "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + accessToken
const sectionTag = document.querySelector("section")

const fetchFromInstagram = function () {
    return fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            return data.data.map(post => {
                return {
                    link: post.link,
                    image: post.images.standard_resolution.url
                }
            })
        })
        .then(cleanData => {
            sectionTag.innerHTML = ""

            cleanData.forEach(post => {
                sectionTag.innerHTML = sectionTag.innerHTML + `
                    <a href="${post.link}" target="_blank">
                        <img src="${post.image}">
                    </a>
                `
            })
        })
        .catch(function (error) {
            sectionTag.innerHTML = "Error: " + error
        })
}

fetchFromInstagram()