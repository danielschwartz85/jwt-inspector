import TextField from '@mui/material/TextField'
import { StyledCard, StyledHeader } from './common'

export interface IEncodedProps {
  value: string
  onChange: (value: string) => void
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
          onChange={(e) => onChange(e.target.value)}
        />
      </StyledCard>
    </>
  )
}
