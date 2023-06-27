import TextField from '@mui/material/TextField'
import { StyledCard, StyledHeader } from './common'

export default function Secret() {
  return (
    <>
      <StyledHeader variant="h5">{'Secret'}</StyledHeader>
      <StyledCard>
        <TextField placeholder="YOUR-SECRET-HERE" sx={{ width: '50%' }} />
      </StyledCard>
    </>
  )
}
