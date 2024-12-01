export default class NotificationMessage {
  static lastNotification;
  element;
  constructor(message = "", { duration = 0, type = "success" } = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;
    this.element = this.createElement(this.createTemplate());
  }

  createTemplate() {
    return `
    <div class="notification ${
      this.type
    }" style="--value:${this.getTimerValue()}s">
      <div class="timer"></div>
      <div class="inner-wrapper">
        <div class="notification-header">${this.type}</div>
        <div class="notification-body">
          ${this.message}
        </div>
      </div>
    </div>
  `;
  }

  createElement(template) {
    const element = document.createElement("div");
    element.innerHTML = template;
    return element.firstElementChild;
  }

  show(targetElement = document.body) {
    if (NotificationMessage.lastNotification) {
      NotificationMessage.lastNotification.destroy();
    }
    NotificationMessage.lastNotification = this;

    targetElement.appendChild(this.element);
    setTimeout(() => this.remove(), this.duration);
  }

  getTimerValue() {
    return this.duration / 1000;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
