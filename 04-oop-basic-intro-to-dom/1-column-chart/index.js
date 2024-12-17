export default class ColumnChart {
  element;
  chartHeight = 50;
  subElements = {};
  constructor({
    data = [],
    label = "",
    link = "",
    value = 0,
    formatHeading = (data) => data,
  } = {}) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = value;
    this.formatHeading = formatHeading;

    this.element = this.createElement(this.createTemplate());
    this.selectSubElements();
  }
  createElement(template) {
    const element = document.createElement("div");
    element.innerHTML = template;
    return element.firstElementChild;
  }
  selectSubElements() {
    this.element
      .querySelectorAll("[data-element]")
      .forEach(
        (element) => (this.subElements[element.dataset.element] = element)
      );
  }
  createLinkTemplate() {
    if (this.link) {
      return `<a href=${this.link} class="column-chart__link">View all</a>`;
    }
    return "";
  }
  getColumnProps() {
    const dataArr = Object.values(this.data);
    const maxValue = Math.max(...dataArr);
    const scale = 50 / maxValue;

    return dataArr.map((item) => {
      return {
        percent: ((item / maxValue) * 100).toFixed(0) + "%",
        value: String(Math.floor(item * scale)),
      };
    });
  }
  createChartBodyTemplate() {
    return this.getColumnProps()
      .map(
        ({ value, percent }) =>
          `<div style="--value: ${value}" data-tooltip="${percent}"></div>`
      )
      .join("");
  }
  createChartClasses() {
    return this.data.length
      ? "column-chart"
      : "column-chart column-chart_loading";
  }
  createTemplate() {
    return `  <div class="${this.createChartClasses()}" style="--chart-height: 50">
    <div class="column-chart__title">
      ${this.label}
      ${this.createLinkTemplate()}
    </div>
    <div class="column-chart__container">
      <div data-element="header" class="column-chart__header">${this.formatHeading(
        this.value
      )}</div>
      <div data-element="body" class="column-chart__chart"> ${this.createChartBodyTemplate()}</div>
    
    </div>
  </div>`;
  }
  updateColumnChartHeader() {
    this.subElements.header.textContent = this.formatHeading(this.value);
  }
  updateColumnChartBody() {
    this.subElements.body.innerHTML = this.createChartBodyTemplate();
  }
  update(newData) {
    this.data = newData;
    this.updateColumnChartBody();
    this.updateColumnChartHeader();
  }

  remove() {
    this.element.remove();
  }
  destroy() {
    this.remove();
  }
}
