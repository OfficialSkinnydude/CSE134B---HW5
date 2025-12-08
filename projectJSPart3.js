const loadLocalButton = document.getElementById("loadLocal");
const loadRemoteButton = document.getElementById("loadRemote");
const addProjectButton = document.getElementById("addProject");
const popUp = document.getElementById("popUp");
const SubmitButton = document.getElementById("submitButton");
const cancelButton = document.getElementById("cancel");
const titleElement = document.getElementById("title");
const imageURL = document.getElementById("imageSource");
const descriptionElement = document.getElementById("description");
const redirectToElement = document.getElementById("redirectTo");
const deleteAllButton = document.getElementById("deleteAll");
const projectDiv = document.getElementById("projects")

class ProjectCard extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
        <style>
            .card{
                width: 30vw;
                height: 60vh;
            }
            picture slot{
            display: flex;
            flex-direction: row;
            justify-content: center;
            text-align: center;
            }


        </style>
        <div class="card">
            <h2>
                <slot name="title"></slot>
            </h2>
            <picture>
                <slot name="image"></slot>
            </picture>
            <p>
                <slot name="description"></slot>
            </p>
            <slot name="redirectTo" id="redirectTo" hidden></slot>
        </div>
        `;
    }
    connectedCallback(){
        this.directTo();
    }

    directTo(){
        const directTo = this.shadowRoot.getElementById('redirectTo');

        directTo.addEventListener("slotchange", () => {
            const url = directTo.assignedNodes()[0]?.textContent.trim();
            if(url){
                this.shadowRoot.querySelector(".card").addEventListener("click", () =>{
                    window.location.href = url;
                });
            }
        });
    };
}

var alreadyLoaded = false;
var jsonArr = []

if(localStorage.getItem("projectData") === null){ //if there is no data saved in localStorage
    localStorage.setItem("projectData", JSON.stringify(jsonArr));
}

var loadData = JSON.parse(localStorage.getItem("projectData")); 
jsonArr = loadData;


loadLocalButton.addEventListener("click", ()=>{ //Local Load
    if(!alreadyLoaded){
        var Data = JSON.parse(localStorage.getItem("projectData"));
        for(let i =0; i < jsonArr.length; i++){
            createProjectCard(Data,i);
        }
        alreadyLoaded = true;
    }
    else{
        alert("Projects Already Loaded!");
    }

});



loadRemoteButton.addEventListener("click", ()=>{ //Remote Load
    if(!alreadyLoaded){
        var Data;
        fetch("https://api.jsonbin.io/v3/b/6935d151d0ea881f40192f35").then((res) => res.json())
        .then(data => {
            Data = data.record.projects;
            for(let i =0; i < Data.length; i++){
                createProjectCard(Data,i);
            }
            alreadyLoaded = true;
        })
    }
    else{
        alert("Projects Already Loaded!")
    }
});

function createProjectCard(data, index){
    const projectJSON = data[index];
    const card = document.createElement("project-card");
    
    const title = document.createElement("span");
    title.setAttribute("slot","title");
    title.textContent = projectJSON.title;        

    const image = document.createElement("img");
    image.setAttribute("slot","image");
    image.setAttribute("src",projectJSON.image);
    image.setAttribute("alt", projectJSON.image + " Image");
    image.setAttribute("loading","lazy");

    const description = document.createElement("span");
    description.setAttribute("slot", "description");
    description.textContent = projectJSON.description;

    const redirectTo = document.createElement("span");
    redirectTo.setAttribute("slot", "redirectTo") 
    redirectTo.textContent = projectJSON.redirectTo;

    card.append(title, image, description, redirectTo);
    document.querySelector(".projects").appendChild(card);
}

function showDialog(){
    popUp.showModal()
}

function closeDialog(){
    popUp.close()
}

addProjectButton.addEventListener("click", ()=>{
    showDialog();
});

SubmitButton.addEventListener("click",(e) =>{
    e.preventDefault()
    var isValid = form.checkValidity();
    if(isValid){
        const newProjectJSON = {
        title: titleElement.value.trim(),
        image: imageURL.value.trim(),
        description: descriptionElement.value.trim(),
        redirectTo: redirectToElement.value.trim()
        }
        jsonArr.push(newProjectJSON);
        localStorage.setItem("projectData",JSON.stringify(jsonArr));
        var Data = JSON.parse(localStorage.getItem("projectData"));        
        createProjectCard(Data,Data.length - 1);
    }    
    console.log(jsonArr);
    closeDialog();
});

cancelButton.addEventListener("click",(e) => {
    e.preventDefault();
    closeDialog();
});

deleteAllButton.addEventListener("click",(e) =>{
    e.preventDefault();
    jsonArr = [];
    localStorage.setItem("projectData", JSON.stringify(jsonArr));
    while(projectDiv.firstChild){
        projectDiv.removeChild(projectDiv.firstChild)
    }
})

customElements.define("project-card",ProjectCard);



