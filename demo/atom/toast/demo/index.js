/* eslint-disable react/prop-types, no-unused-vars, no-console */

import React, {useState} from 'react'

import AtomToast, {
  atomToastPosistions,
  atomToastAutoCloseTimes,
  atomToastSizes
} from '../../../../components/atom/toast/src'

import './index.scss'

const Demo = () => {
  const [show, setShow] = useState(false)
  const [position, setPosition] = useState(atomToastPosistions.BOTTOM)
  const [autoClose, setAutoClose] = useState(false)
  const [autoCloseTime, setAutoCloseTime] = useState(
    atomToastAutoCloseTimes.SHORT
  )
  const [crossToClose, setCrossToClose] = useState(true)
  const [size, setSize] = useState(atomToastSizes.M)

  const renderContent = () => (
    <div className="DemoToast-content">
      <span>Lorem ipsum</span>
    </div>
  )

  return (
    <>
      <h1>Atom Toast</h1>
      <label>
        position
        <select value={position} onChange={ev => setPosition(ev.target.value)}>
          {Object.keys(atomToastPosistions).map(position => (
            <option key={position} value={atomToastPosistions[position]}>
              {position}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        autoClose
        <input
          type="checkbox"
          checked={autoClose}
          onChange={ev => setAutoClose(ev.target.checked)}
        />
      </label>
      <br />
      <label>
        autoCloseTime
        <select
          value={autoCloseTime}
          onChange={ev => setAutoCloseTime(ev.target.value)}
        >
          {Object.keys(atomToastAutoCloseTimes).map(time => (
            <option key={time} value={atomToastAutoCloseTimes[time]}>
              {time}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        crossToClose
        <input
          type="checkbox"
          checked={crossToClose}
          onChange={ev => setCrossToClose(ev.target.checked)}
        />
      </label>
      <br />
      <label>
        size
        <select value={size} onChange={ev => setSize(ev.target.value)}>
          {Object.keys(atomToastSizes).map(size => (
            <option key={size} value={atomToastSizes[size]}>
              {size}
            </option>
          ))}
        </select>
      </label>
      <br />
      <button onClick={() => setShow(true)}>Show Toast</button>
      {show && (
        <AtomToast
          autoClose={Boolean(autoClose)}
          autoCloseTime={autoCloseTime}
          crossToClose={crossToClose}
          position={position}
          onClose={() => setShow(false)}
          size={size}
        >
          {renderContent()}
        </AtomToast>
      )}
    </>
  )
}

export default Demo
