import React, { useRef, useState, useEffect } from 'react'
import ContentEditable from 'react-contenteditable'
import styled from 'styled-components'

const StyledTooltip = styled(ContentEditable)`
  font-family: sans-serif;
  margin: 0 0 0 5px;
  ${props => window.innerWidth - props.x < 180 && 'margin: 0 0 0 -170px;'};
  min-height: 20px;
  width: 150px;
  background-color: #d3d3d3;
  border-radius: 3px;
  color: #000;
  padding: 12.5px 10px;
  font-size: 1rem;
  outline: 0;
  overflow-wrap: break-word;
  -webkit-line-break: after-white-space;
  ${props => (props.disabled ? 'cursor: pointer;' : 'cursor: text')};
`

const Tooltip = ({ id, annotation, x, onAnnotationChange }) => {
  const tooltipRef = useRef()
  const [editable, setEditable] = useState(annotation.length === 0 && true)

  useEffect(() => {
    tooltipRef.current.focus()
  })

  return (
    <StyledTooltip
      innerRef={tooltipRef}
      id={id}
      html={annotation}
      onChange={onAnnotationChange}
      disabled={!editable}
      onClick={() => setEditable(true)}
      x={x}
    />
  )
}

export default Tooltip
