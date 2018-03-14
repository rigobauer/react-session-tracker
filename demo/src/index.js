import React, { Component } from 'react'
import { render } from 'react-dom'

import SessionTracker from '../../src'

class Demo extends Component {

  testItems = [
    { id: 21, name: 'Exercise 1', preparationTime: 2, duration: 3 },
    { id: 34, name: 'Exercise 2', preparationTime: 3, duration: 5 },
    { id: 11, name: 'Exercise 3', preparationTime: 2, duration: 8 },
  ]

  state = {
    sessionState: 'ready'
  }
  
  sessionTracker1 = (props, state) => {
    const currentItem = this.testItems[state.currentItem]
    return (
      <div>
        <div>
          {state.results.map(v =>
            <div key={this.testItems[v.position].name}>
              {this.testItems[v.position].name + ' - ' +
              v.start + ' - ' +
              v.end + ' - ' +
              v.preparation + ' s. - ' +
              v.duration + ' s. - ' +
              v.percentage + ' %'
              }
            </div>
          )}
        </div>
        {state.sessionState !== 'finished' ? 
          <div style={{ border: '1px solid black', display: 'inline-block', padding: '10px' }}>
            <div>SESSION STATUS: {state.sessionState}</div>
            <div>CURRENT ITEM: {`${currentItem.name} (ID: a${currentItem.id})`}</div>
            <div>ITEM PREPARATION TIMER: {state.currentItemPrepTimer} s.</div>
            <div>ITEM TIMER: {state.currentItemTimer} s.</div>
            <div>ITEM PERCENTAGE: {state.currentItemPercentage} %</div>
            <div>TOTAL TIMER: {state.totalTimer} s.</div>
            <div>TOTAL PERCENTAGE: {state.totalPercentage} %</div>
          </div>
          : <div>FINISHED!!</div>
        }
      </div>
    )
  }

  render() {
    const { sessionState } = this.state
    return (
      <div>
        <h1>react-session-tracker Demo</h1>
        <SessionTracker
          items={this.testItems}
          sessionState={sessionState}
        >
          {this.sessionTracker1}
        </SessionTracker>
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
