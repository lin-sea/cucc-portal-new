let webSocket = null;
let socketOpen = false;
 
// 发送消息
export const doSend = (message) => {
  if (socketOpen) {
    console.log(message, "发送消息");
    webSocket.send(message)
  }
}
 
// 初始化websocket
export const contactSocket = () => {
  if ("WebSocket" in window) {
    webSocket = new WebSocket("ws://127.0.0.1:11008");
    webSocket.onopen = function () {
      console.log("连接成功！");
      socketOpen = true
    };
    webSocket.onmessage = function (evt) {
      const received_msg = evt.data;
      console.log("接受消息：" + received_msg);
    };
    webSocket.onclose = function () {
      console.log("连接关闭！");
    };
    webSocket.onerror = function () {
      console.log("连接异常！");
    };
  }
}