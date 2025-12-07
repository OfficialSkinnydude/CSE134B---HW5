const loadLocalButton = document.getElementById("loadLocal");
const loadRemoteButton = document.getElementById("loadRemote");

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

const RSVP = {
    title: "RSVP Website",
    image: "assets/projectCardRSVP.png",
    description: "An RSVP website for a Quinceañera",
    redirectTo: "rsvp.html"
}
jsonArr.push(RSVP);

const webreg = {
    title: "Webreg to Google Calendar",
    image: "assets/projectCardWebreg.png",
    description: "Transfers your Webreg class Schedule to Google Calendar",
    redirectTo: "webreg.html"
}
jsonArr.push(webreg);

/* const vectorSpace = {
    title: "Vector Space",
    image: "assets/vectorSpace.png",
    description: "A math videogame designed to teach middle schoolers how to solve algebraic linear equations",
    redirectTo: "vectorspace.html"
}
jsonArr.push(vectorSpace); */

localStorage.setItem("projectData", JSON.stringify(jsonArr));


loadLocalButton.addEventListener("click", ()=>{
    if(!alreadyLoaded){
        var Data = localStorage.getItem("projectData");
        Data = JSON.parse(Data);
        for(let i =0; i < jsonArr.length; i++){
            const projectJSON = Data[i];
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
        alreadyLoaded = true;
    }
    else{
        alert("Projects Already Loaded!");
    }

});

loadRemoteButton.addEventListener("click", ()=>{
    if(!alreadyLoaded){
        var Data;
        fetch("https://api.jsonbin.io/v3/b/6935d151d0ea881f40192f35").then((res) => res.json())
        .then(data => {
            Data = data.record.projects;
            for(let i =0; i < Data.length; i++){
                const projectJSON = Data[i];
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
            alreadyLoaded = true;
        })
    }
    else{
        alert("Projects Already Loaded!")
    }
});


customElements.define("project-card",ProjectCard);



