const loadLocalButton = document.getElementById("loadLocal");

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

const webreg = {
    title: "Webreg to Google Calendar",
    image: "assets/projectCardWebreg.png",
    description: "Transfers your Webreg class Schedule to Google Calendar",
    redirectTo: "webreg.html"
}

var alreadyLoaded = false;
var jsonArr = []
const webregString = JSON.stringify(webreg);

localStorage.setItem("webregData", webregString);


loadLocalButton.addEventListener("click", ()=>{
    console.log(alreadyLoaded);
    if(!alreadyLoaded){
        var Data = localStorage.getItem("webregData");
        Data = JSON.parse(Data);
        const card = document.createElement("project-card");
        
        const title = document.createElement("span");
        title.setAttribute("slot","title");
        title.textContent = Data.title;        

        const image = document.createElement("img");
        image.setAttribute("slot","image");
        image.setAttribute("src",Data.image);
        image.setAttribute("alt", Data.image + " Image");
        image.setAttribute("loading","lazy");

        const description = document.createElement("span");
        description.setAttribute("slot", "description");
        description.textContent = Data.description;

        const redirectTo = document.createElement("span");
        redirectTo.setAttribute("slot", "redirectTo") 
        redirectTo.textContent = Data.redirectTo;

        card.append(title, image, description, redirectTo);
        document.querySelector(".projects").appendChild(card);
        alreadyLoaded = true;
    }
    else{
        alert("Projects Already Loaded!");
    }

})


customElements.define("project-card",ProjectCard);



