import { Stack } from '@mui/material'
import TextField from '@mui/material/TextField'
import { StyledCard, StyledHeader } from './common'
import { JsonStringSpace } from './util'

export interface IDecoded {
  header: {
    alg: string
  }
  payload: Record<string, unknown>
}

export interface IDecodedProps {
  fullPayload: IDecoded
  onChange: (fullPayload: IDecoded) => void
}

export default function JwtInput(props: IDecodedProps) {
  const { fullPayload } = props
  const payload = JSON.stringify(fullPayload.payload, null, JsonStringSpace)
  const header = JSON.stringify(fullPayload.header, null, JsonStringSpace)

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
          />
          <TextField
            spellCheck={false}
            id="outlined-multiline-static"
            multiline
            rows={8}
            fullWidth={true}
            value={payload}
          />
        </Stack>
      </StyledCard>
    </>
  )
}
