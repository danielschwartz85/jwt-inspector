import { StyledCard, StyledHeader } from '../common/common'
import { useMemo, useState } from 'react'
import TextFieldCopy from '../common/textFieldCopy'

export interface IEncodedProps {
  value?: string
  onChange: (encoded: string) => void
}

function isValid(encoded: string): boolean {
  return /^[^.]+\.[^.]+\.[^.]+$/.test(encoded)
}

export default function Encoded(props: IEncodedProps) {
  const { value, onChange } = props
  const error = useMemo(() => !!value && !isValid(value), [value])
  const [isAppStart, setIsAppStart] = useState(true)

  const onBlur = () => {
    setIsAppStart(false)
  }

  return (
    <>
      <StyledHeader variant="h4">{'Encoded'}</StyledHeader>
      <StyledCard>
        <TextFieldCopy
          value={value}
          placeholder="Paste JWT.."
          rows={10}
          error={error}
          onChange={onChange}
          ariaLabel="encoded input"
          inputRef={(input) => isAppStart && input?.focus()}
          onBlur={onBlur}
        />
      </StyledCard>
    </>
  )
}
