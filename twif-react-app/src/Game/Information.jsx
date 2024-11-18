import styles from '../Pages/CreateParty/CreateParty.module.scss';
import {useNavigate} from 'react-router-dom';


export function Information() {

  const navigate = useNavigate();

  return (
    <div className={styles.pages_bg} style={{ height: "100%" }}>
      <div className={styles.title}>
        <img src="/Group 36866.png" alt="back" onClick={() => {
          navigate('/getready')
        }}/>
        <h2>Information</h2>
      </div>

      <div style={{
        background: 'white',
        borderRadius: '24px',
        width: '100%',
        height: 'auto',
        padding: '25px',
        boxSizing: 'border-box',
        fontFamily: 'Inter'
      }}>
        Each game lasts 60 seconds.
        You can accumulate or restore up to 6 lives.
        When one or more lives are used, they are restored at a rate of one life
        every 10 minutes, up to a maximum of 6 lives.
        If you enter the game after a break of more than an hour since the
        previous game, the maximum limit of 6 lives will be fully restored.
        In the game, you will encounter various obstacles, flying objects, and
        power-ups: <br/> <br/>
        • ❤️: Grants an extra life (up to a maximum of 6). <br/>
        • 🎆: Increases your speed and doubles your points for 15 seconds. <br/>
        • ⛽️: Makes you invulnerable for 15 seconds, allowing you to pass
        through any obstacles and be unaffected by crows or flying
        objects. <br/>
        • 🍔: Extends your game time by 15 seconds. <br/>
        • 🍾: Slows you down in the game for 15 seconds.
        Special Encounters: <br/>
        • 🐦‍: Resets all points collected up until the encounter. <br/>
        •🐦‍: Reduces your remaining game time by 15 seconds.
        Flying objects like bullets and donuts stop your game life immediately.
        Obstacles such as boxes, mailboxes, and puddles will also end your game
        life. <br/> <br/>

        <br/>
        <hr style={{width: '95%', background: 'black', margin: '0'}}/>
        <br/><br/>


        Каждая игра длится 60 секунд.
        Вы можете накопить или восстановить до 6 жизней.
        При использовании одной или нескольких жизней они восстанавливаются со
        скоростью одна жизнь каждые 10 минут, максимум до 6 жизней.
        Если вы начнёте играть после перерыва более часа с момента предыдущей
        игры, максимальный лимит в 6 жизней будет полностью восстановлен.
        В игре вы столкнетесь с различными препятствиями, летающими объектами и
        усилениями: <br/> <br/>
        • ❤️: дает дополнительную жизнь (максимум до 6). <br/>
        • 🎆: увеличивает вашу скорость и удваивает ваши очки на 15
        секунд.<br/>
        • ⛽️: делает вас неуязвимым на 15 секунд, позволяя вам проходить
        через любые препятствия и не подвергаться воздействию ворон или летающих
        объектов.<br/>
        • 🍔: продлевает время игры на 15 секунд.<br/>
        • 🍾: замедляет вас в игре на 15 секунд.
        Особые встречи:<br/>
        • 🐦‍: сбрасывает все очки, набранные до встречи.<br/>
        • 🐦‍: сокращает оставшееся время игры на 15 секунд.<br/>
        Летящие объекты, такие как пули и пончики, немедленно останавливают вашу
        игровую жизнь.<br/>
        Препятствия, такие как ящики, почтовые ящики и лужи, также завершают
        вашу игровую жизнь.<br/>
        <br/><br/>

      </div>
    </div>
  )
}