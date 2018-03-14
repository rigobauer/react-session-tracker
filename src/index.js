import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class SessionTracker extends PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired,
    sessionState: PropTypes.string,
    render: PropTypes.func.isRequired
  }

  static defaultProps = {
    sessionState: 'ready',
  }

  state = {
    sessionState: 'playing',
    results: [],
    currentItem: 0,
    currentItemStart: null,
    currentItemPrepTimer: 0,
    currentItemTimer: 0,
    currentItemPercentage: 0,
    totalTimer: 0,
    totalPercentage: 0,
  }

  update = () => {
    const { currentItem, currentItemStart, currentItemPrepTimer, currentItemTimer, totalTimer } = this.state
    const currentItemDuration = this.props.items[currentItem].duration,
          currentItemPreparation = this.props.items[currentItem].preparationTime
    
    if (currentItemPrepTimer + 1 < currentItemPreparation) {  // Preparation.
      this.setState((prevState, props) => ({
        sessionState: 'preparing',
        currentItemPrepTimer: prevState.currentItemPrepTimer + 1,
      }))
    }
    else if (!currentItemStart) {  // Item Start.
      this.setState((prevState, props) => ({
        sessionState: 'playing',
        currentItemStart: new Date(),
        currentItemPrepTimer: prevState.currentItemPrepTimer + 1,
        currentItemTimer: 0,
        currentItemPercentage: 0,
      }))
    }
    else if (currentItemTimer + 1 < currentItemDuration) {  // Playing Item
      this.setState((prevState, props) => ({
        currentItemTimer: prevState.currentItemTimer + 1,
        currentItemPercentage: Math.round(100 * (prevState.currentItemTimer + 1) / currentItemDuration),
        totalTimer: prevState.totalTimer + 1,
        totalPercentage: Math.round(100 * (prevState.totalTimer + 1) / this.totalDuration),
      }))
    }
    else {  // Item End (move to next).
      this.setState((prevState, props) => ({
        sessionState: props.items[currentItem + 1] ? 'preparing' : 'finished',
        results: [
          ...prevState.results,
          { 
            position: currentItem,
            start: currentItemStart,
            end: new Date(),
            preparation: currentItemPrepTimer,
            duration: prevState.currentItemTimer + 1,
            percentage: Math.round(100 * (prevState.currentItemTimer + 1) / currentItemDuration),
          }
        ],
        currentItem: props.items[currentItem + 1] ? prevState.currentItem + 1 : null,
        currentItemStart: null,
        currentItemPrepTimer: 0,
        currentItemTimer: 0,
        currentItemPercentage: 0,
      }))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.timerID && this.state.sessionState === 'finished') {
      clearInterval(this.timerID)
      this.timerID = null
    }
  }

  componentDidMount() {
    this.totalDuration = this.props.items.reduce((total, v) => total + v.duration, 0)
    if (this.state.sessionState === 'playing')
      this.timerID = setInterval(this.update, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  render() {
    return this.props.children(this.props, this.state)
  }
}

export default SessionTracker
