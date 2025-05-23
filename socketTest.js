const io = require("socket.io-client");


const userId = "425_8"
const token = "GVB7KRTB071747816171"; // Replace with your real session token

const socket = io("https://ourhoneybee.xyz:7421", {
  path: "/socket.io",
  transports: ["websocket"],
  query: {
    userId: userId,
  },
  extraHeaders: {
    Authorization: `Bearer ${token}`,
  },
});

// Basic connection events
socket.on("connect", () => {
  console.log("Connected to the server");

  // Emit update_my_socket after connection
  socket.emit("update_my_socket", {
    userId: userId,
    token: token,
    user_status: '_ON_',
    force_broadcast: 1
  });

  console.log("Sent update_my_socket with userId and token");
});

socket.on("disconnect", () => {
  console.log("Disconnected");
});

socket.on("connect_error", (err) => {
  console.error("Connection error:", err.message);
});

// Listen for the specific event
socket.on("refresh_attendance_status", (data) => {
  console.log("refresh_attendance_status event received:", data);
  console.log("Current Status log:", data.currentStatus)
   if (data.currentStatus == '1') {
    console.log("Status: IN");
  } else {
    console.log("Status: OUT");
  }
});

// Listen for all events (for debugging)
const onevent = socket.onevent;
socket.onevent = function (packet) {
  const args = packet.data || [];
  console.log("Event received:", args[0], args.slice(1));
  onevent.call(this, packet);
};
