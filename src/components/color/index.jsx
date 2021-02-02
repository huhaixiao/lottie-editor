import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import _ from 'lodash'
import { assignNewSolidColor } from '../../core'
import { data, parsedColor } from '../atoms'
import { useReset } from '../hooks'
import "./style"

export function ColorMenu() {
  const dataValue = useRecoilValue(data)

  const getColors = useCallback(() => {
    if (!dataValue) return null
    return <ColorList />
  }, [dataValue])

  return <div className="color">
    {getColors()}
  </div>
}

function ColorList() {
  const parsed = useRecoilValue(parsedColor)
  const layers = Object.keys(parsed).reverse()

  return <div className="color-list">
    {
      layers.map((key, i) => {
        const layer = parsed[key]
        const { layerName } = layer
        return <div key={layerName} className="parseColorItem">
          <span className="color-layer-name">{layerName}</span>
          <Cells layer={layer} layerId={i} />
        </div>
      })
    }
  </div>
}

function Cells(props) {
  const { layer, layerId } = props
  const shapes = Object.keys(layer).filter(key => key != "layerName")

  return shapes.map((key, i) => {
    if (layer[key][1].keyFramed) {
      return null
    }
    if (layer[key][1].type == 'gf' || layer[key][1].type == 'gs') {
      return null
    }
    return <SolidList item={layer[key]} shapeId={key} index={i} />
  })
}

function SolidList(props) {
  const colorRef = useRef(null)
  const reset = useReset()
  const parsed = useRecoilValue(parsedColor)
  const [dataValue, setDataValue] = useRecoilState(data)
  const { item, shapeId, index } = props
  let rootItemName = item[1].itemName.split('->')[0].trim()

  function update(colorProps) {
    reset()
    setDataValue(pre => {
      return assignNewSolidColor(_.cloneDeep(pre), colorProps).animation
    })
  }

  return (
    <div
      className="color-item"
      key={shapeId}
      onClick={() => {
        console.log(
          {
            rootItemName: rootItemName,
            layerId: item[1].layerId,
            shapeGroupId: shapeId,
            color: item[1].color
          }
        )
      }}
      style={{ fontSize: 12, paddingRight: 5 }}>
      <div className="color-thumbnail">
        {index == 0 && <div className="color-thumbnail-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 9.5V5C18 3.89543 17.1046 3 16 3H5C3.89543 3 3 3.89543 3 5V16C3 17.1046 3.89543 18 5 18H9.5" stroke="#181818" strokeWidth="2" />
            <rect x="9" y="9" width="12" height="12" rx="6" stroke="#181818" strokeWidth="2" />
          </svg>
        </div>
        }
      </div>
      <div className="color-description">
        <span>{item[0] + ' - ' + rootItemName}</span>
      </div>
      <div className="color-selector">
        <div className="color-selector-btn" onClick={() => colorRef.current.click()}>
          <input ref={colorRef} type="color" defaultValue={1} onChange={(evt) => {
            const color = evt.target.value
            const r = hex2dec(color.substring(1, 3))
            const g = hex2dec(color.substring(3, 5))
            const b = hex2dec(color.substring(5, 7))
            const a = 1
            const colorProps = {
              items: parsed[item[1].layerId][shapeId],
              pickedColor: [r, g, b, a],
              type: null,
            }
            update(colorProps)
          }} />
          <div className="color-selector-btn-content" style={{ background: 'rgba(' + item[1].color.join() + ')' }}></div>
        </div>
      </div>
    </div>
  )
}

function hex2dec(hex) {
  return parseInt(hex, 16)
}