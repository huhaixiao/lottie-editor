import React from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { Slider, Row, Col } from 'antd'
import { data, status, lottieCurrentTime, controllerCurrentTime, loop, direction, isPaused } from './atoms'
import { Frame } from './frame'
import { icon } from '../icons'
import './controller-style'

export function Controller() {
  const isPausedValue = useRecoilValue(isPaused)
  const dataValue = useRecoilValue(data)
  const statusValue = useRecoilValue(status)
  const controllerCurrentTimeValue = useRecoilValue(controllerCurrentTime)
  const setLottieCurrentTime = useSetRecoilState(lottieCurrentTime)
  
  if (!dataValue) return null

  return (
    <div
      className="controller"
      style={{
        marginBottom: '24px',
        width: '800px',
        backgroundColor: '#fff',
        padding: '22px 28px',
        border: '1px solid #EEF4F8',
        borderRadius: '16px'
      }}
    >
      <Row align='middle'>
        <Col span={3}>
          <Row align="middle">
            {
              isPausedValue
                ? <Play />
                : <Pause />
            }
            <Stop />
          </Row>
        </Col>
        <Col span={16}>
          <LottieSlider
            value={controllerCurrentTimeValue}
            max={statusValue.op}
            onChange={setLottieCurrentTime}
          />
        </Col>
        <Col span={5}>
          <Row align="middle">
            <Col span={12}>
              <Frame />
            </Col>
            <Col span={12}>
              <Row justify="space-between" align="middle">
                <Loop />
                <Direction />
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

function Play() {
  const setIsPaused = useSetRecoilState(isPaused)

  function play() {
    setIsPaused(false)
  }

  return (
    <div
      className="play"
      onClick={play}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
      }}
    >
      {icon.play}
    </div>
  )
}

function Pause() {
  const setIsPaused = useSetRecoilState(isPaused)
  const controllerCurrentTimeValue = useRecoilValue(controllerCurrentTime)
  const setLottieCurrentTime = useSetRecoilState(lottieCurrentTime)

  function pause() {
    setIsPaused(true)
    setLottieCurrentTime(controllerCurrentTimeValue)
  }

  return (
    <div
      className="pause"
      onClick={pause}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
      }}
    >
      {icon.pause}
    </div>
  )
}

function Stop() {
  const setIsPaused = useSetRecoilState(isPaused)
  const setLottieCurrentTime = useSetRecoilState(lottieCurrentTime)


  function pause() {
    setIsPaused(true)
    setLottieCurrentTime(0)
  }

  return (
    <div
      className="stop"
      onClick={pause}
      style={{
        marginLeft: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
      }}
    >
      {icon.stop}
    </div>
  )
}

function LottieSlider(props) {
  const setIsPaused = useSetRecoilState(isPaused)
  const { value, max, onChange } = props

  return (
    <Slider
      value={value}
      max={max}
      onChange={val => {
        onChange(val)
        setIsPaused(true)
      }}
    />
  )

  // return (
  //   <input
  //     type="range"
  //     value={value}
  //     max={max}
  //     onChange={evt => onChange(evt.target.value)}
  //   />
  // )
}

function Loop() {
  const [loopVal, setLoopVal] = useRecoilState(loop)

  function handleClick() {
    setLoopVal(pre => !pre)
  }

  return (
    <div className="loop" onClick={handleClick}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM17.4992 5.81378C14.3208 2.72894 9.18584 2.71208 6.01379 5.79072C5.58145 6.21033 5.57113 6.90098 5.99074 7.33333C6.41036 7.76567 7.101 7.77599 7.53335 7.35638C9.85219 5.10581 13.641 5.1096 15.9797 7.37944C16.7384 8.11578 17.2482 8.99681 17.512 9.92667L17.4092 9.85144C16.923 9.49556 16.2404 9.60118 15.8846 10.0873C15.5287 10.5735 15.6343 11.2561 16.1205 11.612L18.129 13.0822C18.5419 13.3845 19.1096 13.3591 19.4938 13.021L21.4478 11.3022C21.9002 10.9043 21.9443 10.215 21.5464 9.76261C21.1485 9.31024 20.4591 9.2661 20.0068 9.66403L19.7477 9.89192C19.441 8.39579 18.6898 6.96932 17.4992 5.81378ZM5.87108 10.6269C5.4581 10.3246 4.89047 10.35 4.50618 10.6881L2.55222 12.4069C2.09984 12.8048 2.0557 13.4941 2.45364 13.9465C2.85157 14.3989 3.54089 14.443 3.99327 14.0451L4.25233 13.8172C4.55904 15.3133 5.31018 16.7398 6.50079 17.8953C9.67922 20.9802 14.8142 20.997 17.9862 17.9184C18.4186 17.4988 18.4289 16.8081 18.0093 16.3758C17.5897 15.9435 16.899 15.9331 16.4667 16.3527C14.1478 18.6033 10.359 18.5995 8.02034 16.3297C7.26168 15.5934 6.75184 14.7123 6.48806 13.7825L6.59076 13.8577C7.07692 14.2136 7.75952 14.1079 8.1154 13.6218C8.47128 13.1356 8.36567 12.453 7.87952 12.0972L5.87108 10.6269Z"
          fill={loopVal ? "#1884FF" : "#181818"}
        />
      </svg>
    </div>
  )
}

function Direction() {
  const [directionVal, setDirectionVal] = useRecoilState(direction)

  function handleClick() {
    setDirectionVal(pre => {
      if (pre === 1) return -1
      return 1
    })
  }

  return (
    <div className="direction" onClick={handleClick}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM10.0008 6.81245C10.4495 6.41037 10.4872 5.72068 10.0852 5.27198C9.68309 4.82328 8.9934 4.78549 8.5447 5.18757L4.72652 8.60906C4.48922 8.8217 4.35675 9.12745 4.36391 9.446C4.37107 9.76455 4.51714 10.064 4.76374 10.2658L8.58192 13.3898C9.04823 13.7713 9.73552 13.7026 10.117 13.2363C10.4986 12.77 10.4298 12.0827 9.96353 11.7011L8.51063 10.5124H13.9835C15.9005 10.5124 17.4545 12.0665 17.4545 13.9835C17.4545 15.9005 15.9005 17.4546 13.9835 17.4546H6.54546C5.94296 17.4546 5.45455 17.943 5.45455 18.5455C5.45455 19.148 5.94296 19.6364 6.54546 19.6364H13.9835C17.1055 19.6364 19.6364 17.1055 19.6364 13.9835C19.6364 10.8615 17.1055 8.33059 13.9835 8.33059H8.3066L10.0008 6.81245Z"
          fill={directionVal === 1 ? "#181818" : "#1884ff"} />
      </svg>
    </div>
  )
}