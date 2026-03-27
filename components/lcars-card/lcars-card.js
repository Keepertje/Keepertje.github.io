fetch("components/lcars-card/lcars-card.html")
  .then((stream) => stream.text())
  .then((text) => define(text));

function define(html) {
  class LcarsCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({
        mode: "open",
      });
      const template = document.createElement("template");
      template.innerHTML = html;
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      const headerText = this.getAttribute("header");
      if (headerText) {
        this.shadowRoot.getElementById("header-text").textContent = headerText;
      } else {
        this.shadowRoot.getElementById("header-text").remove();
      }
    }
  }
  customElements.define("lcars-card", LcarsCard);
}
