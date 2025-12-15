const sockjs = require("sockjs");
const http = require("http");

const onlineMap = {};
const connections = {}; // workspace별 연결 관리

module.exports = (server, app) => {
  app.set("onlineMap", onlineMap);
  app.set("connections", connections);

  // SockJS 서버 생성
  const sockjsServer = sockjs.createServer({
    sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js",
    log: (severity, message) => {
      console.log(`[SockJS ${severity}]`, message);
    },
  });

  sockjsServer.on("connection", (conn) => {
    let currentWorkspace = null;
    let currentUserId = null;
    let joinedChannels = [];

    console.log("New connection:", conn.id);

    conn.on("data", (message) => {
      try {
        const data = JSON.parse(message);
        const { type, payload } = data;

        switch (type) {
          case "CONNECT":
            // STOMP CONNECT 프레임
            currentWorkspace = payload.workspace;
            if (!connections[currentWorkspace]) {
              connections[currentWorkspace] = {};
            }
            connections[currentWorkspace][conn.id] = conn;

            if (!onlineMap[currentWorkspace]) {
              onlineMap[currentWorkspace] = {};
            }

            conn.write(
              JSON.stringify({
                type: "CONNECTED",
                payload: { workspace: currentWorkspace },
              })
            );
            break;

          case "SUBSCRIBE":
            // STOMP SUBSCRIBE 프레임
            const destination = payload.destination;
            console.log("Subscribe to:", destination);
            break;

          case "SEND":
            // STOMP SEND 프레임
            const { destination: dest, body } = payload;

            if (dest.startsWith("/pub/login")) {
              // 로그인 처리
              const { id, channels } = JSON.parse(body);
              currentUserId = id;
              joinedChannels = channels || [];

              console.log("🔐 로그인 처리:", {
                userId: id,
                workspace: currentWorkspace,
                connId: conn.id,
              });

              if (currentWorkspace && onlineMap[currentWorkspace]) {
                onlineMap[currentWorkspace][conn.id] = id;
                console.log(
                  "✅ 온라인맵 업데이트:",
                  onlineMap[currentWorkspace]
                );
              } else {
                console.log("❌ 온라인맵 없음:", {
                  currentWorkspace,
                  hasOnlineMap: !!onlineMap[currentWorkspace],
                });
              }

              // 온라인 목록 브로드캐스트
              const onlineUserIds = Object.values(
                onlineMap[currentWorkspace] || {}
              );
              console.log("📤 온라인 유저 목록 브로드캐스트:", onlineUserIds);

              broadcastToWorkspace(currentWorkspace, {
                type: "MESSAGE",
                destination: "/sub/onlineList",
                body: JSON.stringify(onlineUserIds),
              });

              conn.write(
                JSON.stringify({
                  type: "MESSAGE",
                  destination: "/sub/hello",
                  body: currentWorkspace,
                })
              );
            }
            break;

          case "DISCONNECT":
            cleanup();
            break;

          default:
            console.log("Unknown message type:", type);
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    });

    conn.on("close", () => {
      cleanup();
    });

    function cleanup() {
      if (currentWorkspace && connections[currentWorkspace]) {
        delete connections[currentWorkspace][conn.id];

        if (onlineMap[currentWorkspace]) {
          delete onlineMap[currentWorkspace][conn.id];

          // 온라인 목록 업데이트 브로드캐스트
          broadcastToWorkspace(currentWorkspace, {
            type: "MESSAGE",
            destination: "/sub/onlineList",
            body: JSON.stringify(
              Object.values(onlineMap[currentWorkspace] || {})
            ),
          });
        }

        if (Object.keys(connections[currentWorkspace]).length === 0) {
          delete connections[currentWorkspace];
        }
      }
      console.log("Connection closed:", conn.id);
    }
  });

  // Helper function to broadcast to all connections in a workspace
  function broadcastToWorkspace(workspace, message) {
    if (connections[workspace]) {
      Object.values(connections[workspace]).forEach((conn) => {
        try {
          conn.write(JSON.stringify(message));
        } catch (error) {
          console.error("Error broadcasting:", error);
        }
      });
    }
  }

  // app에 broadcast 함수 추가
  app.set("broadcast", (workspace, destination, body) => {
    broadcastToWorkspace(workspace, {
      type: "MESSAGE",
      destination,
      body: typeof body === "string" ? body : JSON.stringify(body),
    });
  });

  // app에 sendToUser 함수 추가 (DM용)
  app.set("sendToUser", (workspace, userId, destination, body) => {
    if (connections[workspace] && onlineMap[workspace]) {
      const connectionId = Object.keys(onlineMap[workspace]).find(
        (key) => onlineMap[workspace][key] === userId
      );

      if (connectionId && connections[workspace][connectionId]) {
        try {
          connections[workspace][connectionId].write(
            JSON.stringify({
              type: "MESSAGE",
              destination,
              body: typeof body === "string" ? body : JSON.stringify(body),
            })
          );
        } catch (error) {
          console.error("Error sending to user:", error);
        }
      }
    }
  });

  // SockJS를 특정 경로에 설치
  sockjsServer.installHandlers(server, { prefix: "/ws" });

  console.log("SockJS server installed at /ws");
};
