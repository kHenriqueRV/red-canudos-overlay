import '../../Styles/live_game.css'
import tower from '../../assets/tower-icon.png'
import gold from '../../assets/gold-icon.png'
import voidgrubs from '../../assets/voidgrubs-icon.png'
import red from '../../assets/red-logo.png'
import vk from '../../assets/vk-logo.png'

function live_game() {
    return (
        <div className='pai'>

            <div className='scoreboard'>
                <div className="teamblue">
                    <img className="logo-blue" src={red}></img>
                    <div className="torres-blue">
                        <img className="torres_blue_icon" src={tower}></img>
                        <h2 className="torres_blue_value">torres</h2>
                    </div>
                    <div className="vastilarvas-blue">
                        <img className="vastilarvas_blue_icon" src={voidgrubs}></img>
                        <h2 className="torres_blue_value">vastilarva</h2>
                    </div>
                    <div className="ouro-blue">
                        <img className="ouro_blue_icon" src={gold}></img>
                        <h2 className="ouro_blue_value">ouro</h2>
                    </div>
                    <h1 className="abates_blue">0</h1>
                </div>
                <h1 className="X">X</h1>
                <div className="teamred">
                    <h1 className="abates_red">0</h1>
                    <div className="ouro-red">
                        <h2 className="ouro_red_value">ouro</h2>
                        <img className="ouro_red_icon" src={gold}></img>
                    </div>
                    <div className="vastilarvas-red">
                        <h2 className="torres_red_value">vastilarva</h2>
                        <img className="vastilarvas_red_icon" src={voidgrubs}></img>
                    </div>
                    <div className="torres-red">
                        <h2 className="torres_red_value">torres</h2>
                        <img className="torres_red_icon" src={tower}></img>
                    </div>
                    <img className="logo-red" src={vk}></img>
                </div>
            </div>
            <div className='timer'>00:00</div>
        </div>
    )
}

export default live_game