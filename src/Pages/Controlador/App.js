
import '../../Styles/App.css';
import { useEffect, useState } from 'react';

function App() {

  const [tabelaouro, settabelaouro] = useState(false);
  const [tabelaxp, settabelaxp] = useState(false);
  const [runas, setrunas] = useState(false);

  useEffect(()=> {
    console.log(tabelaouro);
    console.log(tabelaxp);
    console.log(runas);
  }, [tabelaouro, tabelaxp, runas]);

  return (
    <div className="App">
      <button>In-game</button>
      <button onClick={() => setrunas(!runas)} >Runas</button>
      <button onClick={() => settabelaouro(!tabelaouro)}>tabela Ouro</button>
      <button onClick={() => settabelaxp(!tabelaxp)}>tabela XP</button>
    </div>
  );
}

export default App;
