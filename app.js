//Select Element 
const userInput = document.querySelector(".userInput");
const submitButton = document.querySelector(".submitButton");
const notFound = document.querySelector(".notFound");
const profileArea = document.querySelector(".profile_area");


//AddEventListener Section
submitButton.addEventListener("click",() => {
    if(userInput.value.trim() == ""){
        alert("Enter Github Profile");
    }
    profileArea.innerHTML = "";
    getGithubUserInfo();
    userInput.value = ""; 
    notFound.innerHTML = "";  
})
document.addEventListener("DOMContentLoaded", () => {
    getGithubUserInfo();
})

//Fetch Api Section
const getGithubUserInfo = async () => {
    const url = userInput.value === "" ? "https://api.github.com/users" : `https://api.github.com/users/${userInput.value}`;

    try {
            const responses = await fetch(url);
            const data = await responses.json();
            if(!responses.ok){
                throw new Error("Not Found This User Profile.");
            }
            else{
                if(!Array.isArray(data)){
                     response(data);
                }
                else{
                   data.map((user) => {
                         response(user);
                    });

                }
            }
        } 
    catch (error) {

        notFound.innerHTML = error.message;
    }      
}

//Catch Fetch API
const response = (responseData) => {
        profileArea.innerHTML +=
        `<div class="card">
                <img src="${responseData.avatar_url}" alt="profileImage">
                <h1 class="fullName">${responseData.login}</h1>
                <div class="bio">${responseData.bio === undefined || responseData.bio === null ? "": responseData.bio}</div>
                <div class="followersSection">
                    <span class="followers">Followers: ${responseData.followers === undefined || responseData.bio === null ? "0" : responseData.followers}</span>
                    <span class="following">Following: ${responseData.following === undefined || responseData.bio === null ? "0" : responseData.following}</span>
                </div>
        </div>`;

}


