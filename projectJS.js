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




customElements.define("project-card",ProjectCard);



