import TextField from '@mui/material/TextField'
import { StyledCard, StyledHeader } from './common'

export enum EEncodedState {
  'Verified' = 'Verified',
  'Unverified' = 'Unverified',
  'Invalid' = 'Invalid',
}

export interface IEncodedProps {
  value?: string
  state: EEncodedState
  onChange: (encoded: string) => void
}

export default function Encoded(props: IEncodedProps) {
  const { value, state, onChange } = props

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
          error={state !== EEncodedState.Verified}
          onChange={(e) => onChange(e.target.value)}
        />
      </StyledCard>
    </>
  )
}
