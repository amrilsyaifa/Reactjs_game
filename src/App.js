import Background from "./components/Background/Background";
import Cloud from "./components/Cloud/Cloud";
import StartButton from "./components/StartButton/StartButton";
import { useState, useEffect, useRef } from "react";
import Plane from "./components/Plane/Plane";
import Bird from "./components/Bird/Bird";
import Button from './components/Button/Button'
import Star from "./components/Star/Star";
import AppBar from "./components/AppBar/AppBar";
import mp3 from './assets/mp3/backsound.mp3'
import Modal from "./components/Modal/Modal";
import Parachute from "./components/Parachute/Parachute";

import "./App.css";

import { isEmpty } from './utils/isEmpty'

const getRandomCoordinatesHorizontal = () => {
  let min = 1;
  let max = 80;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [-x, y]
}

function App() {
  const [planePosition, setPlanePosition] = useState([80, 44]); //left top
  const [birdPosition, setBirdPosition] = useState(getRandomCoordinatesHorizontal()); //left top
  const [starPosition, setStarPosition] = useState(getRandomCoordinatesHorizontal()); //left top
  const [parachutePosition, setParachutePosition] = useState(getRandomCoordinatesHorizontal()); //left top
  const [isStart, setIsStart] = useState(false);
  const [point, setPoint] = useState(0);
  const [energy, setEnergy] = useState(10);
  const [speed] = useState(200);
  const [timer, setTimer] = useState(0);
  const [show, setShow] = useState(false);
  const [volume, setVolume] = useState(5); //left top speed
  const [isPause, setIsPause] = useState(false); //left top speed
  const [temporaryData, setTemporaryData] = useState({}); //left top speed
  const [name, setName] = useState(''); //left top speed
  const [users, setUsers] = useState([]); //left top speed
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({}); //left top speed

  const ref = useRef('audio');
  const timerID = useRef()
  const timerCheckBatery = useRef()


  // componentDidmount
  useEffect(() => {
    checkRankingUser()
  }, [])

  const checkRankingUser = () => {
    const userData = localStorage.getItem('dataUser')

    if (userData) {
      const userDataParse = JSON.parse(userData)
      const ranking = userDataParse.sort((a, b) => {
        return parseFloat(a.stars) > parseFloat(b.stars) ? -1 : parseFloat(a.time) < parseFloat(b.time) ? -1 : 1
      });
      setUsers(ranking)
    }

  }

  useEffect(() => {
    document.onkeydown = onKeyDown;
    if (!isPause) {
      birdHitPlane()
      starHitPlane()
      parachuteHitPlane()
    }
  })

  useEffect(() => {
    if (!isPause) {
      timerID.current = setInterval(() => {
        // bird
        let oldPositionBird = [...birdPosition]
        if (oldPositionBird[0] >= 100) {
          setBirdPosition(getRandomCoordinatesHorizontal())
        } else {
          setBirdPosition([oldPositionBird[0] + 2, oldPositionBird[1]])
        }

        // star
        let oldPositionStar = [...starPosition]
        if (oldPositionStar[0] >= 100) {
          setStarPosition(getRandomCoordinatesHorizontal())
        } else {
          setStarPosition([oldPositionStar[0] + 2, oldPositionStar[1]])
        }

        // parachute
        let oldPositionParachute = [...parachutePosition]
        if (oldPositionParachute[0] >= 100) {
          setParachutePosition(getRandomCoordinatesHorizontal())
        } else {
          setParachutePosition([oldPositionParachute[0] + 2, oldPositionParachute[1]])
        }

      }, speed);

      return () => clearInterval(timerID.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [birdPosition, starPosition, parachutePosition])


  useEffect(() => {
    if (!isPause) {
      timerCheckBatery.current = setInterval(() => {
        if (energy <= 0) {
          gameOver()
        } else {
          setEnergy(energy - 1)
        }
        setTimer(timer + 1)
      }, 1000);

      return () => clearInterval(timerCheckBatery.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [energy])

  const onKeyDown = (e) => {
    e = e || window.event;
    var oldTop = planePosition[1]
    var oldLeft = planePosition[0]
    switch (e.keyCode) {
      case 38: //up             
        oldTop > 0 && setPlanePosition([planePosition[0], oldTop - 2])
        break;
      case 40: // down
        oldTop < 80 && setPlanePosition([planePosition[0], oldTop + 2])
        break;
      case 37: //left
        oldLeft > 0 && setPlanePosition([oldLeft - 2, planePosition[1]])
        break;
      case 39: //right
        oldLeft < 80 && setPlanePosition([oldLeft + 2, planePosition[1]])
        break;
      case 32: //right
        isPause ? onResume() : onPause()
        break;
      default:
        break;
    }
  }

  const birdHitPlane = () => {
    if ((Math.abs(planePosition[0] - birdPosition[0])) < 10 && (Math.abs(planePosition[1] - birdPosition[1])) < 10) {
      gameOver()
    }
  }

  const starHitPlane = () => {
    if ((Math.abs(planePosition[0] - starPosition[0])) < 10 && (Math.abs(planePosition[1] - starPosition[1])) < 10) {
      setStarPosition(getRandomCoordinatesHorizontal())
      setPoint(point + 1)
    }
  }

  const parachuteHitPlane = () => {
    if ((Math.abs(planePosition[0] - parachutePosition[0])) < 10 && (Math.abs(planePosition[1] - parachutePosition[1])) < 10) {
      setParachutePosition(getRandomCoordinatesHorizontal())
      setEnergy(10)
    }
  }

  const start = () => {
    setIsStart(true)
    ref.current.play();
    setIsPause(false)
    setBirdPosition(getRandomCoordinatesHorizontal())
    setStarPosition(getRandomCoordinatesHorizontal())
    setEnergy(10)
    setShow(false)
  }

  const onChangeSlider = (e) => {
    setVolume(Number(e.target.value))
    ref.current.volume = Number(e.target.value) / 10;
  }

  const onClose = () => {
    setShow(!show)
    setIsStart(false)
    ref.current.pause();
    checkRankingUser()
  }

  const gameOver = () => {
    setIsPause(!isPause)
    setShow(!show)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (name.length > 2) {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(() => {
          let user = [{ name, star: point, timer }]
          const oldUser = localStorage.getItem('dataUser')
          if (oldUser) {
            let userParse = JSON.parse(oldUser)
            const concatUser = user.concat(userParse)
            localStorage.setItem("dataUser", JSON.stringify(concatUser))
            onClose()
          } else {
            localStorage.setItem("dataUser", JSON.stringify(user))
            onClose()
          }
        })
        .catch((err) => setErrors(err))
    }

  }

  const onPause = () => {
    setIsPause(true)
    ref.current.pause();
    setTemporaryData({
      energy,
      birdPosition,
      starPosition,
      parachutePosition
    })
  }

  const onResume = () => {
    setIsPause(false)
    ref.current.play();
    setEnergy(temporaryData.energy)
    setBirdPosition(temporaryData.birdPosition)
    setStarPosition(temporaryData.starPosition)
    setParachutePosition(temporaryData.parachutePosition)
  }

  const onRestart = () => {
    start()
  }

  return (
    <div className="center">
      <audio ref={ref} loop>
        <source src={mp3} />
      </audio>
      <div className="game-area">
        <Background>
          {isStart ?
            <Cloud /> :
            <div>
              <div className="title-container">
                <h2 className="title">Sky Angel</h2>
              </div>
              <div className="center home-page">
                {!isEmpty(users) &&
                  <table>
                    <thead>
                      <tr>
                        <th>Nama</th>
                        <th>Point</th>
                        <th>Timer</th>
                        <th>Ranking</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users && users.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>{data.name}</td>
                            <td>{data.star}</td>
                            <td>{data.timer}</td>
                            <td>{index + 1}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>}
                <StartButton onClick={() => {
                  start()
                }}
                />
              </div>
            </div>
          }
        </Background>
        {isStart &&
          <div className="content">
            <AppBar
              onChangeSlider={onChangeSlider}
              volume={volume}
              bar={energy}
              onPause={() => isPause ? onResume() : onPause()}
              onRestart={() => onRestart()}
              star={point}
              isPause={isPause}
            />
            <Star data={starPosition} />
            <Bird data={birdPosition} />
            <Parachute data={parachutePosition} />
            <Plane data={planePosition} />
            <Modal onClose={onClose} show={show}>
              <div>
                <h1 className="text-center">Game Over</h1>
                <form className="whatsapp-form">
                  <div className="datainput">
                    <input
                      className="validate"
                      id="wa_name"
                      name="name"
                      required=""
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <span className="highlight"></span><span className="bar"></span>
                    <label>Your Name</label>
                  </div>
                  <div>
                    <h4 className="text-green">Your time : {timer} second</h4>
                    <h4 className="text-green">Your star : {point}</h4>
                  </div>
                  <Button title="Submit" color="green" onClick={onSubmit} />
                </form>
              </div>
            </Modal>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
