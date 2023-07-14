import TextField from '@mui/material/TextField'
import { StyledCard, StyledHeader } from './common'
import InputCopy from './inputCopy'
import { useState } from 'react'

export interface IEncodedProps {
  value?: string
  onChange: (encoded: string) => void
}

function isValid(encoded: string): boolean {
  return /^[^.]+\.[^.]+\.[^.]+$/.test(encoded)
}

export default function Encoded(props: IEncodedProps) {
  const { value, onChange } = props
  const [isHovered, setIsHovered] = useState(false)

  return (
    <>
      <StyledHeader variant="h4">{'Encoded'}</StyledHeader>
      <StyledCard>
        <TextField
          placeholder="Paste JWT.."
          multiline
          rows={10}
          fullWidth={true}
          spellCheck={false}
          value={value}
          error={!!value && !isValid(value)}
          onChange={(e) => onChange(e.target.value)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          InputProps={{ endAdornment: <InputCopy value={value} visible={isHovered} /> }}
        />
      </StyledCard>
    </>
  )
}
