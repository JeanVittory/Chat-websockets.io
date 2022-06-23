const socket = io();

const message = document.querySelector("#message");
const username = document.querySelector("#username");
const output = document.querySelector(".output");
const actions = document.querySelector(".actions");
const btn = document.querySelector(".send");

let initial = ""

let position = () =>{
    if(initial === "" || initial === "right"){
        initial = "left"
        return "left"
    }else{
        initial = "right"
        return "right"
    }
}

socket.on("chat:Message", (data) => {
  actions.innerHTML = "";
  output.innerHTML += `
    <p class = ${position()}>
    <strong>${data.username}</strong>: ${data.message}
    </p>
    `;
});

message.addEventListener("keypress", () => {
  socket.emit("chat:typing", username.value || "Unknow");
});

socket.on("chat:typing", (data) => {
  actions.innerHTML = `
        <p><em>${data} is typing</em></p>
        `;
});

btn.addEventListener("click", () => {
  if(!message.value) return Toastify({
    text: "please write a message",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", 
    position: "right", 
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    }// Callback after click
  }).showToast();
  socket.emit("chat:Message", {
    username: username.value,
    message: message.value,
  });
});
