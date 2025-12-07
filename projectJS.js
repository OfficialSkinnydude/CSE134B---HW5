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
        </div>
        `;

    }
}

customElements.define("project-card",ProjectCard);

