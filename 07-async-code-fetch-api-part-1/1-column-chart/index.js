import fetchJson from "./utils/fetch-json.js";
import ColumnChartV1 from "../../04-oop-basic-intro-to-dom/1-column-chart/index.js";
const BACKEND_URL = "https://course-js.javascript.ru";

export default class ColumnChart extends ColumnChartV1 {
  constructor({
    data = [],
    label = "",
    link = "",
    value = 0,
    formatHeading = (data) => data,
    url = "",
    range = { from: new Date(), to: new Date() },
  } = {}) {
    super({ data, label, link, value, formatHeading });
    this.url = url;
    this.range = range;
  }

  async update(from, to) {
    this.range = { from, to };
    await this.fetchData();
    this.element.classList.remove("column-chart_loading");
    this.value = Object.values(this.data).reduce(
      (acc, value) => acc + value,
      0
    );

    super.update(this.data);
    return this.data;
  }
  createUrl() {
    const url = new URL(`${BACKEND_URL}/${this.url}`);

    url.searchParams.append("from", this.range.from);
    url.searchParams.append("to", this.range.to);

    if (this.value < 100) {
      url.searchParams.append("price", "low");
    }

    return url.toString();
  }
  async fetchData() {
    try {
      const response = await fetch(this.createUrl());
      const data = await response.json();
      this.data = data;
    } catch (err) {
      console.error("Fetching error", err);
    }
  }
}
