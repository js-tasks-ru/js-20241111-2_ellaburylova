class Tooltip {
  static instance;
  constructor() {
    if (Tooltip.instance) return Tooltip.instance;
    Tooltip.instance = this;
    this.element = null;
  }
  createTooltipTemplate(tooltipContent) {
    const div = document.createElement("div");
    div.classList = "tooltip";
    div.content = tooltipContent;
    return div;
  }
  render(tooltipContent) {
    if (!this.element) {
      this.element = this.createTooltipTemplate(tooltipContent);
      document.body.appendChild(this.element);
    }
    this.element.textContent = tooltipContent;
  }
  onTextPointerOver = (e) => {
    const target = e.target.closest("[data-tooltip]");
    if (target) {
      const tooltipContent = target.dataset.tooltip;
      this.render(tooltipContent);
    }
  };
  onTextPointerOut = () => {
    this.removeTooltip();
  };
  onTextPointerMove = (e) => {
    this.element.style.left = `${e.clientX}px`;
    this.element.style.top = `${e.clientY}px`;
  };
  initialize() {
    document.addEventListener("pointerover", this.onTextPointerOver);
    document.addEventListener("pointerout", this.onTextPointerOut);
    document.addEventListener("pointermove", this.onTextPointerMove);
  }
  removeTooltip() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
  removeListeners() {
    document.removeEventListener("pointerover", this.onTextPointerOver);
    document.removeEventListener("pointerout", this.onTextPointerOut);
    document.removeEventListener("pointermove", this.onTextPointerMove);
  }
  destroy() {
    this.removeTooltip();
    this.removeListeners();
    Tooltip.instance = null;
  }
}

export default Tooltip;
