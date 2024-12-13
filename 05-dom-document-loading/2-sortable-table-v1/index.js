export default class SortableTable {
  element;
  subElements = {};
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createElement(this.createTemplate());
    this.selectSubElements();
  }
  selectSubElements() {
    this.element
      .querySelectorAll("[data-element]")
      .forEach(
        (element) => (this.subElements[element.dataset.element] = element)
      );
  }

  createHeaderTemplate() {
    return this.headerConfig
      .map(
        (header) => `  
    <div class="sortable-table__cell" data-id="${header.id}" data-sortable="${header.sortable}">
      <span>${header.title}</span>
    </div>`
      )
      .join("");
  }
  createElement(template) {
    const element = document.createElement("div");
    element.innerHTML = template;
    return element.firstElementChild;
  }
  createCellTemplate(product, column) {
    const id = column["id"];
    if (column.template) return column.template(product.images);
    return `<div class="sortable-table__cell">${product[id]}</div>`;
  }
  createRowTemplate(product) {
    return `
    <a href="/products/${product.id}" class="sortable-table__row">
    ${this.headerConfig
      .map((column) => this.createCellTemplate(product, column))
      .join("")}
  </a>`;
  }
  createBodyTemplate() {
    return this.data.map((product) => this.createRowTemplate(product)).join("");
  }
  createTemplate() {
    return `<div class="sortable-table">
     <div data-element="header" class="sortable-table__header sortable-table__row">
       ${this.createHeaderTemplate()}
     </div>
    <div data-element="body" class="sortable-table__body">
      ${this.createBodyTemplate()}
    </div>
    <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
    <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
      <div>
        <p>No products satisfies your filter criteria</p>
        <button type="button" class="button-primary-outline">Reset all filters</button>
      </div>
    </div>
  </div>`;
  }
  getSortFunc(column, direction) {
    const { sortType, id } = column;
    if (sortType === "number") return (a, b) => direction * (a[id] - b[id]);
    if (sortType === "string")
      return (a, b) =>
        direction *
        a[id].localeCompare(b[id], ["ru", "en"], {
          caseFirst: "upper",
          sensitivity: "variant",
        });
  }
  sort(fieldValue, orderValue) {
    const column = this.headerConfig.find((col) => col.id === fieldValue);
    if (!column || !column.sortable) return;
    const direction = orderValue === "asc" ? 1 : -1;
    const sortFunc = this.getSortFunc(column, direction);
    this.data.sort(sortFunc);
    this.updateTableBody();
  }
  updateTableBody() {
    this.subElements.body.innerHTML = this.createBodyTemplate();
  }
  remove() {
    this.element.remove();
  }
  destroy() {
    this.remove();
  }
}
