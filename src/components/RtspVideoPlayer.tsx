import { useEffect, useRef } from "react";

const RtspStream = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let player;

    const loadPlayer = async () => {
      try {
        const { loadPlayer } = await import("rtsp-relay/browser");

        player = loadPlayer({
          url: `ws://localhost:2000/api/stream`,
          canvas: canvasRef.current,
        });

        console.log("Player initialized successfully");

        // Monitor canvas display property
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (
              mutation.type === "attributes" &&
              mutation.attributeName === "style"
            ) {
              console.log(
                "Canvas style changed:",
                canvasRef.current.style.display
              );
              if (canvasRef.current.style.display === "none") {
                canvasRef.current.style.display = "block";
              }
            }
          });
        });

        observer.observe(canvasRef.current, { attributes: true });
      } catch (error) {
        console.error("Error initializing player:", error);
      }
    };

    loadPlayer();

    return () => {
      if (player && player.destroy) {
        player.destroy();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        border: "1px solid black",
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
};

export default RtspStream;
