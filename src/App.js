import React from "react"
import moment from "moment"
import { Container, Row, Col, Button, Card, Jumbotron } from "react-bootstrap"

const people = [
  {
    name: "Jonjoe",
    salary: 69000
  },
  {
    name: "Emi",
    salary: 100000
  },
  {
    name: "Cy",
    salary: 2000
  }
]

const App = () => {
  const [timer, updateTimer] = React.useState({
    seconds: 60 * 45,
    started: false,
    timeStarted: null,
    timeStopped: null,
    interval: null
  })

  React.useEffect(() => {
    if (timer.started && !timer.timeStarted) {
      const interval = setInterval(() => {
        updateTimer((previous) => {
          return {
            ...previous,
            seconds: previous.seconds + 1
          }
        })
      }, 1000)

      updateTimer((previous) => {
        return {
          ...previous,
          timeStarted: new Date(),
          interval
        }
      })
    }

    if (!timer.started && timer.timeStarted && timer.timeStopped) {
      clearInterval(timer.interval)
    }

  }, [timer, updateTimer])

  return (
    <div className="App">
      <Container>
        <Row>
          <h1>Timer</h1>
        </Row>

        <Row>
          <Col>
            <Jumbotron>
              <p>
                This meeting Cost {generateCost(people, timer.seconds)}
              </p>
            </Jumbotron>
          </Col>
        </Row>

        <Row className="pt-4 pb-4">
          <Col>
            <Button onClick={() => handleMeetingStarted(timer, updateTimer)}>
              {timer.started ? "Stop" : "Start"} Timer
            </Button>
          </Col>
        </Row>

        <Row className="pt-4 pb-4">
          {people.map((person, index) => (
            <Card key={index} style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{person.name}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </Row>

        <Row>
          <Col>
            <h3>Clock</h3>
            <span>{timer.seconds}</span>
          </Col>

          <Col>
            <h3>Results</h3>

            {timer.timeStarted && (
              <p>Meeting Started: {moment(timer.timeStarted).format('MMMM Do, h:mm:ss a')}</p>
            )}

            {timer.timeStopped && (
              <p>Meeting Stopped: {moment(timer.timeStopped).format('MMMM Do, h:mm:ss a')}</p>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

function generateCost(people, duration) {
  let cost = 0
  const workingDays = 20 * 12 - 30
  const secondsIn8hours = 28800

  people.forEach((person) => {
    const dayCost = person.salary / workingDays
    const secondCost = dayCost / secondsIn8hours

    cost = cost + secondCost * duration
  })

  return cost
}
function handleMeetingStarted(timer, updateTimer) {
  if (!timer.timeStarted && !timer.timeStopped) {
    console.log("start timer")
    return updateTimer((previous) => {
      return {
        ...previous,
        started: true, 
        timeStopped: null
      }
    })
  }

  if (timer.timeStarted && !timer.timeStopped) {
    return updateTimer((previous) => {
      return {
        ...previous,
        started: false, 
        timeStopped: new Date(),
      }
    })
  }
}

export default App;
