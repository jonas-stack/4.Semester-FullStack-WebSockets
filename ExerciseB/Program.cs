using Fleck;

var wsConnectionState = new List<IWebSocketConnection>() { };

var server = new WebSocketServer("ws://0.0.0.0:8181");
server.Start(socket =>
{
    socket.OnOpen = () => wsConnectionState.Add(socket);
    socket.OnClose = () => wsConnectionState.Remove(socket);
    socket.OnMessage = message => wsConnectionState.ForEach(e => e.Send(message));
});

Console.ReadLine();