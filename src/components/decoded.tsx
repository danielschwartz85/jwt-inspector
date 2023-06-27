import { Stack } from '@mui/material'
import TextField from '@mui/material/TextField'
import { StyledCard, StyledHeader } from './common'

export default function JwtInput() {
  return (
    <>
      <StyledHeader variant="h4">{'Decoded'}</StyledHeader>{' '}
      <StyledCard>
        <Stack spacing={1}>
          <TextField id="outlined-multiline-static" multiline rows={4} fullWidth={true} />
          <TextField id="outlined-multiline-static" multiline rows={8} fullWidth={true} />
        </Stack>
      </StyledCard>
    </>
  )
}
