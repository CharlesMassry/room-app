import { Controller } from "@hotwired/stimulus"
import roomChannel from "../channels/room_channel"

// Connects to data-controller="rooms"
export default class extends Controller {
  connect() {
      document.addEventListener('mousemove', logMousePosition);
      var $this = this;
      var timesPerSecond = 2;
      var wait = false;
      function logMousePosition(e) {
          if (!wait) {
              // fire the event
              $this.element.textContent = `Mouse position: ${e.clientX}, ${e.clientY}`;
              roomChannel.send({ id: window.id, sent_by: $this.element.dataset["currentUserEmail"], x: e.clientX, y: e.clientY })
              // stop any further events
              wait = true;
              // after a fraction of a second, allow events again
              setTimeout(function () {
                  wait = false;
              }, 1000 / timesPerSecond);
          }
      }
  }
}
