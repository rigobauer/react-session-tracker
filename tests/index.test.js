import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import SessionTracker from 'src/'

describe('<SessionTracker />', () => {
  it('should shallow render a <SessionTracker /> as null', () => {
    const wrapper = shallow(<SessionTracker render={(props, state) => null} />)
    expect(wrapper.html()).to.equal(null)
  })

  // it('should shallow render a <SessionTracker /> printing the default bpm', () => {
  //   const wrapper = shallow(
  //     <SessionTracker render={(props, state) => <div>{props.bpm}</div>} />
  //   )
  //   expect(wrapper.html()).to.equal('<div>80</div>')
  // })

  // it('should shallow render a <SessionTracker /> printing the configured bpm and subdivision', () => {
  //   const wrapper = shallow(
  //     <SessionTracker
  //       bpm={120}
  //       subdivision={3}
  //       render={(props, state) => (
  //         <div>
  //           {props.bpm}/{props.subdivision}
  //         </div>
  //       )}
  //     />
  //   )
  //   expect(wrapper.html()).to.equal('<div>120/3</div>')
  // })

  // it('should shallow render a <SessionTracker /> printing quarter notes and 16th notes and checking sound play', () => {
  //   let clock = sinon.useFakeTimers()
  //   sinon.stub(Howl.prototype, 'play')
  //   sinon.spy(SessionTracker.prototype, 'render')
  //   sinon.spy(SessionTracker.prototype, 'componentWillReceiveProps')
  //   sinon.spy(SessionTracker.prototype, 'componentWillUnmount')

  //   let interval = Math.floor(60000 / (80 * 4))
  //   const wrapper = mount(
  //     <SessionTracker
  //       bpm={80}
  //       subdivision={4}
  //       isPlaying={false}
  //       soundEnabled={true}
  //       soundPattern="3222322232223222"
  //       render={(props, state) => (
  //         <div>
  //           {state.qNote}/{state.subNote}
  //         </div>
  //       )}
  //     />
  //   )

  //   expect(wrapper.text()).to.equal('1/1')
  //   clock.tick(5 * interval + 5)
  //   expect(wrapper.text()).to.equal('1/1')
  //   wrapper.setProps({ isPlaying: true })
  //   clock.tick(interval + 5)
  //   expect(wrapper.text()).to.equal('1/2')
  //   clock.tick(interval + 5)
  //   expect(wrapper.text()).to.equal('1/3')
  //   wrapper.setProps({ isPlaying: false })
  //   clock.tick(interval + 5)
  //   expect(wrapper.text()).to.equal('1/3')
  //   wrapper.setProps({ isPlaying: true })
  //   clock.tick(interval + 5)
  //   expect(wrapper.text()).to.equal('1/4')
  //   clock.tick(interval + 5)
  //   expect(wrapper.text()).to.equal('2/1')
  //   clock.tick(interval + 5)
  //   expect(wrapper.text()).to.equal('2/2')
  //   clock.tick(10 * interval + 5)
  //   expect(wrapper.text()).to.equal('4/4')
  //   clock.tick(interval + 5)
  //   expect(wrapper.text()).to.equal('1/1')

  //   sinon.assert.callCount(Howl.prototype.play, 16)

  //   wrapper.setProps({ bpm: 100, subdivision: 2, soundPattern: '32323232' })
  //   expect(SessionTracker.prototype.componentWillReceiveProps.callCount).to.equal(
  //     4
  //   )
  //   interval = Math.floor(60000 / (100 * 2))
  //   clock.tick(interval + 5)
  //   expect(wrapper.text()).to.equal('1/2')

  //   expect(SessionTracker.prototype.render.callCount).to.equal(22)
  //   expect(SessionTracker.prototype.componentWillUnmount.notCalled).to.equal(true)
  //   wrapper.unmount()
  //   expect(SessionTracker.prototype.componentWillUnmount.calledOnce).to.equal(
  //     true
  //   )

  //   clock.restore()
  //   Howl.prototype.play.restore()
  // })

  // it('should shallow render a <SessionTracker /> and check bpm, subdivision and soundPattern type and length errors', () => {
  //   sinon.stub(console, 'error')

  //   let interval = Math.floor(60000 / (80 * 4))
  //   const wrapper = mount(
  //     <SessionTracker
  //       bpm="80"
  //       subdivision={2}
  //       soundEnabled={false}
  //       render={(props, state) => (
  //         <div>
  //           {state.qNote}/{state.subNote}
  //         </div>
  //       )}
  //     />
  //   )

  //   sinon.assert.callCount(console.error, 1)
  //   sinon.assert.calledWithMatch(
  //     console.error,
  //     'Warning: Failed prop type: Invalid prop `bpm` of type `string` supplied to SessionTracker, expected `number`.'
  //   )
  //   console.error.resetHistory()
  //   wrapper.setProps({ bpm: 350 })
  //   sinon.assert.callCount(console.error, 1)
  //   sinon.assert.calledWithMatch(
  //     console.error,
  //     'Warning: Failed prop type: Invalid prop `bpm` with value 350 supplied to SessionTracker. Allowed range is 1-300.'
  //   )
  //   console.error.resetHistory()
  //   wrapper.setProps({ bpm: 80, subdivision: '2' })
  //   sinon.assert.callCount(console.error, 1)
  //   sinon.assert.calledWithMatch(
  //     console.error,
  //     'Warning: Failed prop type: Invalid prop `subdivision` of type `string` supplied to SessionTracker, expected `number`.'
  //   )
  //   console.error.resetHistory()
  //   wrapper.setProps({ subdivision: 12 })
  //   sinon.assert.callCount(console.error, 1)
  //   sinon.assert.calledWithMatch(
  //     console.error,
  //     'Warning: Failed prop type: Invalid prop `subdivision` with value 12 supplied to SessionTracker. Allowed range is 1-8.'
  //   )
  //   console.error.resetHistory()
  //   wrapper.setProps({
  //     subdivision: 2,
  //     soundEnabled: true,
  //     soundPattern: 323232323
  //   })
  //   sinon.assert.callCount(console.error, 1)
  //   sinon.assert.calledWithMatch(
  //     console.error,
  //     'Warning: Failed prop type: Invalid prop `soundPattern` of type `number` supplied to SessionTracker, expected `string`.'
  //   )
  //   console.error.resetHistory()
  //   wrapper.setProps({ soundPattern: '323232323' })
  //   sinon.assert.callCount(console.error, 1)
  //   sinon.assert.calledWithMatch(
  //     console.error,
  //     "Warning: Failed prop type: Invalid prop `soundPattern` with length 9 supplied to SessionTracker. Length value doesn't match with the subdivision, expected 8."
  //   )
  //   console.error.resetHistory()
  //   wrapper.setProps({ soundPattern: '32323232' })
  //   sinon.assert.notCalled(console.error)

  //   console.error.restore()
  // })
})
