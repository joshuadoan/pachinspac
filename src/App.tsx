import { useEffect } from "react";
import { Loader } from "excalibur";

import "./App.css";
import { Game } from "./engine/Game";

function App() {
  useEffect(() => {
    const game = new Game();
    game.initialize();
    game.start();
  }, []);

  return (
    <main>
      <header>Header</header>
    </main>
  );
}

export default App;
