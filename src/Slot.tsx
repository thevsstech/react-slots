type Props = {
  children: any
}

const Slot = ({ children }: Props) => {
  return children || null
}

export const SlotDisplayName = 'VSS_SLOT'
Slot.displayName = SlotDisplayName
export default Slot
