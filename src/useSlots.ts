import React, { useMemo } from 'react'
import Slot, { SlotDisplayName } from './Slot'

const except = (key: string, value: Object) => {
  const clone = { ...value }
  delete clone[key]
  return clone
}

type Props = {
  children?: JSX.Element | JSX.Element[]
  as: string
}

export default function ({ children, as }: Props) {
  return useMemo(() => {
    if (!children) {
      return []
    }

    if (!Array.isArray(children)) {
      children = [children]
    }

    const slots: JSX.Element[] = []
    React.Children.forEach(children, (child) => {
      if (!child) {
        return
      }

      if (child.type === Slot || child.type.displayName === SlotDisplayName) {
        slots.push(child)
      }
    })

    const items = as
      ? slots.filter((item) => {
          return item.props.as === as
        })
      : slots

    return items.map((item) => ({
      props: except('children', item.props),
      children: item.props.children
    }))
  }, [children])
}
