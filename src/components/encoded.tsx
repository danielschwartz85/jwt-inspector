import TextField from '@mui/material/TextField'
import { StyledCard, StyledHeader } from './common'

export interface IEncodedProps {
  value?: string
  onChange: (encoded: string) => void
}

export function isValid(encoded: string): boolean {
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
        />
      </StyledCard>
    </>
  )
}
