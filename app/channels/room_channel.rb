class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room:#{Room.find(params[:id]).id}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    ActionCable.server.broadcast("room:#{Room.find(params[:id]).id}", data)
  end
end
