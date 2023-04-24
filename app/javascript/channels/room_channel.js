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
          var existingBlock = document.querySelector(".other_user_block[data-email='" + data.sent_by + "']");
          var block;
          if (existingBlock) {
              block = existingBlock
          } else {
              block = document.createElement("div");
              block.className = "other_user_block";
              block.dataset.email = data.sent_by;
              block.style.width = "10px";
              block.style.height = "10px";
              block.style.position = "absolute";
              block.style.backgroundColor = "black";
              document.body.appendChild(block);
          }
          block.style.top = data.y + "px";
          block.style.left = data.x + "px";
      }
  }
});
