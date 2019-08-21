import React, { useState } from 'react'
import { uid } from 'react-uid'
import emojis from 'emojis-list'
import styled from 'styled-components'

import Tooltip from './tooltip'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f3f3f3;
  cursor: cell;
  overflow: hidden;
`

const Marker = styled.div`
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
  font-size: 2rem;
  display: flex;
  ${props =>
    window.innerWidth - props.x < 180 && 'flex-direction: row-reverse;'};

  span {
    cursor: not-allowed;
  }
`

const Annotations = () => {
  const [markers, setMarkers] = useState([])
  const [tooltip, setTooltip] = useState(null)

  const addAnnotation = e => {
    if (!tooltip) {
      const { clientX: x, clientY: y } = e
      const random = Math.floor(Math.random() * (emojis.length - 1))
      const marker = {
        x: x - 15,
        y: y - 20,
        emoji: emojis[random],
        annotation: ''
      }
      const id = uid(marker)

      setMarkers([...markers, { id, ...marker }])
    }
  }

  const showTooltip = e => {
    const { id } = e.currentTarget

    setTooltip(id)
  }

  const onAnnotationChange = e => {
    const {
      target: { value },
      currentTarget: {
        parentNode: { id }
      }
    } = e

    setMarkers(
      markers.map(marker =>
        marker.id === id ? { ...marker, annotation: value } : marker
      )
    )
  }

  const removeMarker = e => {
    e.stopPropagation()

    setMarkers(
      markers.filter(marker => marker.id != e.currentTarget.parentNode.id)
    )
    setTooltip(null)
  }

  return (
    <Container onClick={addAnnotation}>
      {markers.map(marker => (
        <Marker
          key={marker.id}
          id={marker.id}
          x={marker.x}
          y={marker.y}
          onMouseEnter={showTooltip}
          onMouseLeave={() => setTooltip(null)}
        >
          <span role="img" onClick={removeMarker}>
            {marker.emoji}
          </span>
          {tooltip === marker.id && (
            <Tooltip
              tooltip={tooltip}
              id={marker.id}
              x={marker.x}
              annotation={marker.annotation}
              onAnnotationChange={onAnnotationChange}
            />
          )}
        </Marker>
      ))}
    </Container>
  )
}

export default Annotations
