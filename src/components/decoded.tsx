import { Stack } from '@mui/material'
import TextField from '@mui/material/TextField'
import { StyledCard, StyledHeader } from './common'

export interface IDecodedProps {
  payload: string
  header: string
  onPayloadChange: (payload: string) => void
  onHeaderChange: (header: string) => void
}

export default function JwtInput(props: IDecodedProps) {
  const { payload, header, onHeaderChange, onPayloadChange } = props
  return (
    <>
      <StyledHeader variant="h4">{'Decoded'}</StyledHeader>
      <StyledCard>
        <Stack spacing={1}>
          <TextField
            spellCheck={false}
            id="outlined-multiline-static"
            multiline
            rows={4}
            fullWidth={true}
            value={header}
            onChange={(e) => onHeaderChange(e.target.value)}
          />
          <TextField
            spellCheck={false}
            id="outlined-multiline-static"
            multiline
            rows={8}
            fullWidth={true}
            value={payload}
            onChange={(e) => onPayloadChange(e.target.value)}
          />
        </Stack>
      </StyledCard>
    </>
  )
}
