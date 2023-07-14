import TextField from '@mui/material/TextField'
import { StyledCard, StyledHeader } from './common'
import InputCopy from './inputCopy'

export interface IEncodedProps {
  value?: string
  onChange: (encoded: string) => void
}

function isValid(encoded: string): boolean {
  return /^[^.]+\.[^.]+\.[^.]+$/.test(encoded)
}

export default function Encoded(props: IEncodedProps) {
  const { value, onChange } = props
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
          // We can toggle InputCopy on hover but then need to fix text resize jump.
          InputProps={{ endAdornment: <InputCopy value={value} /> }}
        />
      </StyledCard>
    </>
  )
}
