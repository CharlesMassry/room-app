import consumer from "channels/consumer"

window.id = window.location.pathname.match(/\/rooms\/(\d+)/)[1];
var currentUserEmail = document.getElementById("room_controller").dataset["currentUserEmail"];
export default consumer.subscriptions.create({ channel: "RoomChannel", id: id}, {
  connected() {
    // Called when the subscription is ready for use on the server
      console.log("connected")
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
      console.log("disconnected")
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
      if (data.sent_by !== currentUserEmail) {
          var existingBlockContainer = document.querySelector(".other_user_block_container[data-email='" + data.sent_by + "']");
          var container;
          if (existingBlockContainer) {
              container = existingBlockContainer;
          } else {
              container = document.createElement("div");
              container.className = "other_user_block_container";
              container.dataset.email = data.sent_by;

              var block = document.createElement("div");
              container.append(block);

              var emailBlock = document.createElement("div");
              emailBlock.innerText = data.sent_by;
              container.append(emailBlock);

              block.dataset.email = data.sent_by;
              block.style.width = "10px";
              block.style.height = "10px";
              container.style.position = "absolute";
              block.style.backgroundColor = randomColor();

              document.body.appendChild(container);
          }
          container.style.top = data.y + "px";
          container.style.left = data.x + "px";
      }
  }
});

var webColors = [
    "#FF0000", // Red
    "#00FF00", // Green
    "#0000FF", // Blue
    "#FFFF00", // Yellow
    "#FF00FF", // Magenta
    "#00FFFF", // Cyan
    "#800000", // Maroon
    "#008000", // Olive
    "#000080", // Navy
    "#808000", // Olive Drab
    "#800080", // Purple
    "#008080", // Teal
    "#C0C0C0", // Silver
    "#808080", // Gray
    "#FFA500", // Orange
    "#FFC0CB", // Pink
    "#800000", // Brown
    "#FFD700", // Gold
    "#00FF7F", // Spring Green
    "#FF69B4" // Hot Pink
];

function randomColor() {
    var color = webColors[Math.floor(Math.random() * webColors.length)];

    webColors = webColors.filter( c => c !== color);

    return color;
}
