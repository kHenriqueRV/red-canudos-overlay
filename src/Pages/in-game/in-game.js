import '../../Styles/live_game.css'
import tower from '../../assets/tower-icon.png'
import gold from '../../assets/gold-icon.png'
import voidgrubs from '../../assets/voidgrubs-icon.png'
import red from '../../assets/red-logo.png'
import vk from '../../assets/vk-logo.png'
import { useEffect, useState } from 'react'
import teste from '../../teste.json'
import itens from '../../itens.json'

const Teams = {
    RED: 'CHAOS',
    BLUE: 'ORDER'
}

function Live_game() {

    const [gamedata, setgameData] = useState(teste);

    const [redTeamGold, setRedTeamGold] = useState(0);
    const [blueTeamGold, setBlueTeamGold] = useState(0);
    const [blueTeamTower, setblueTeamTower] = useState(0);
    const [redTeamTower, setredTeamTower] = useState(0);
    const [blueTeamLarva, setblueTeamLarva] = useState(0);
    const [redTeamLarva, setredTeamLarva] = useState(0);


  useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/gamedata');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setgameData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const intervalId = setInterval(fetchData, 1000);
    }, []);


    function segundosParaMinutosSegundos(segundos) {
        let minutos = Math.floor(segundos / 60);
        let segundosRestantes = Math.round(segundos % 60);
        if (segundosRestantes === 60) {
            segundosRestantes = 0;
            minutos = minutos + 1
        }
        const segundosFormatados = segundosRestantes < 10 ? `0${segundosRestantes}` : segundosRestantes;
        const minutosFormatados = minutos > 59 ? Math.floor(minutos % 60) : minutos;
        return `${minutosFormatados < 10 ? `0${minutosFormatados}` : minutosFormatados}:${segundosFormatados}`;
    }


    useEffect(() => {
        let blueGold = 0;
        let redGold = 0;
        
        gamedata.allPlayers.forEach(player => {
            player.items.forEach(item => {
                console.log(`Item id: ${item.itemID}`);
                // Verifica se o ID do item está no arquivo itens.json
                if (itens.data[item.itemID]) {
                    const foundItem = itens.data[item.itemID];
                    console.log(foundItem);
                    // Se o item for encontrado, adicione o preço ao ouro da equipe correspondente
                    player.team === Teams.RED ? redGold += foundItem.gold.total : blueGold += foundItem.gold.total;
                }
            });
        });
        
        setBlueTeamGold(blueGold);
        setRedTeamGold(redGold);
        console.log(blueTeamGold);
    }, [gamedata]);
    

    function convertergold(gold) {
        let goldk = Math.trunc(gold / 1000)
        let goldc = Math.floor((gold % 1000) / 100)
        return `${goldk}.${goldc}K`
    }

    useEffect(() => {
        // Variáveis de contagem de torres
        let redTowerCount = 0;
        let blueTowerCount = 0;
    
        // Conjunto para armazenar os IDs únicos de eventos de torres já contados
        const countedTowerEvents = new Set();
    
        // Iterar sobre os eventos do jogo
        gamedata.events.Events.forEach(event => {
            // Verificar se o evento é um TurretKilled e se o ID do evento não está no conjunto de eventos contados
            if (event.EventName === "TurretKilled" && !countedTowerEvents.has(event.EventID)) {
                // Encontrar o jogador associado ao evento de TurretKilled
                const player = gamedata.allPlayers.find(player => player.summonerName === event.KillerName);
                if (player) {
                    // Verificar a equipe do jogador e incrementar a contagem de torres apropriada
                    if (player.team === Teams.RED) {
                        redTowerCount++;
                    } else if (player.team === Teams.BLUE) {
                        blueTowerCount++;
                    }
                }
                // Adicionar o ID do evento ao conjunto de eventos contados
                countedTowerEvents.add(event.EventID);
            }
        });
    
        // Atualizar os totais de torres
        setredTeamTower(redTowerCount);
        setblueTeamTower(blueTowerCount);
    }, [gamedata]);
    
    

    useEffect(() => {
        let redLarvaCount = 0;
        let blueLarvaCount = 0;
    
        // Criar um conjunto para armazenar os IDs únicos de eventos de larvas já contados
        const countedLarvaEvents = new Set();
    
        gamedata.events.Events.forEach(event => {
            if (event.EventName === "HordeKill" && !countedLarvaEvents.has(event.EventID)) {
                const player = gamedata.allPlayers.find(player => player.summonerName === event.KillerName);
                if (player) {
                    const team = player.team;
                    if (team === Teams.RED) {
                        redLarvaCount++;
                    } else if (team === Teams.BLUE) {
                        blueLarvaCount++;
                    }
                }
                // Adicionar o ID do evento ao conjunto de eventos contados
                countedLarvaEvents.add(event.EventID);
            }
        });
    
        setredTeamLarva(redLarvaCount);
        setblueTeamLarva(blueLarvaCount);
    }, [gamedata]);

    console.log(`torres vermelho` + redTeamTower)

    const bluegold = convertergold(blueTeamGold)
    const redgold = convertergold(redTeamGold)
    const tempojogo = segundosParaMinutosSegundos(gamedata.gameData.gameTime)

    return (
        <div className='pai'>

            <div className='scoreboard'>
                <div className="teamblue">
                    <img className="logo-blue" src={red}></img>
                    <div className="torres-blue">
                        <img className="torres_blue_icon" src={tower}></img>
                        <h2 className="torres_blue_value">{blueTeamTower}</h2>
                    </div>
                    <div className="vastilarvas-blue">
                        <img className="vastilarvas_blue_icon" src={voidgrubs}></img>
                        <h2 className="torres_blue_value">{blueTeamLarva}</h2>
                    </div>
                    <div className="ouro-blue">
                        <img className="ouro_blue_icon" src={gold}></img>
                        <h2 className="ouro_blue_value">{bluegold}</h2>
                    </div>
                    <h1 className="abates_blue">0</h1>
                </div>
                <h1 className="X">X</h1>
                <div className="teamred">
                    <h1 className="abates_red">0</h1>
                    <div className="ouro-red">
                        <h2 className="ouro_red_value">{redgold}</h2>
                        <img className="ouro_red_icon" src={gold}></img>
                    </div>
                    <div className="vastilarvas-red">
                        <h2 className="torres_red_value">{redTeamLarva}</h2>
                        <img className="vastilarvas_red_icon" src={voidgrubs}></img>
                    </div>
                    <div className="torres-red">
                        <h2 className="torres_red_value">{redTeamTower}</h2>
                        <img className="torres_red_icon" src={tower}></img>
                    </div>
                    <img className="logo-red" src={vk}></img>
                </div>
            </div>
            <div className='timer'>{tempojogo}</div>
        </div>
    )
}

export default Live_game
