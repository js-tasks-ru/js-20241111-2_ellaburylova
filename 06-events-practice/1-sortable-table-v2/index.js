import SortableTableV1 from "../../05-dom-document-loading/2-sortable-table-v1/index.js";

export default class SortableTable extends SortableTableV1 {

  constructor(headersConfig, { data = [], sorted = {} } = {}) {
    super(headersConfig, data);
    this.isSortLocally = true;
    this.sortOnClient = super.sort;
    this.sorted = sorted;
    this.createListeners();
    this.arrowElement = this.createArrowElement();
    this.addDefaultSorting();
  }
  createArrowTemplate() {
    return `<span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
      </span>`;
  }
  createArrowElement() {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = this.createArrowTemplate();
    return tempElement.firstElementChild;
  }
  sort (sortField, sortOrder) {
    if (this.isSortLocally) { 
      this.sortOnClient(sortField, sortOrder);
    } else {
      this.sortOnServer();
    }
}
  addDefaultSorting() {
    const { id, order } = this.sorted;
    const defaultSortingHederCell = this.subElements.header.querySelector(
      `[data-id='${id}']`
    );

    if (defaultSortingHederCell) {
      defaultSortingHederCell.appendChild(this.arrowElement);
      defaultSortingHederCell.dataset.order = order;
      this.sort(id, order);
    }
  }
  
  onHeaderCellClick = (e) => {
    const headerCell = e.target.closest(".sortable-table__cell");
    if (!headerCell || !headerCell.dataset.sortable) return;
    headerCell.appendChild(this.arrowElement);
    const { id } = headerCell.dataset;
    const currentOrder = headerCell.dataset.order;

    const newOrder = currentOrder === "asc" ? "desc" : "asc";

    this.sorted = { id, order: newOrder };
    const field = headerCell.dataset.id;
    headerCell.dataset.order = newOrder;

    this.sort(field, newOrder);
  };
  createListeners() {
    this.subElements.header.addEventListener("click", this.onHeaderCellClick);
  }

  destroyListeners() {
    this.subElements.header.removeEventListener(
      "click",
      this.onHeaderCellClick
    );
  }
  destroy() {
    super.destroy();
    this.destroyListeners();
  }
}
