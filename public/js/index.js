console.log('test');

var webSocket = WS.connect("ws://127.0.0.1:8080");

webSocket.on("socket/connect", function(session) {
    //session is an AutobahnJS WAMP session.

    console.log("Successfully Connected!");

    // The callback function in "subscribe" is called every time an event is published in that channel.
    session.subscribe("acme/channel", function(uri, payload) {
        console.log("Received message", payload);
    });

    session.publish("acme/channel", { msg: "This is a message!" });

    session.unsubscribe("acme/channel");

    session.publish("acme/channel", { msg: "I won't see this" });
})

webSocket.on("socket/disconnect", function(error) {
    //error provides us with some insight into the disconnection: error.reason and error.code

    console.log("Disconnected for " + error.reason + " with code " + error.code);
})