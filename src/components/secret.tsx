import TextField from '@mui/material/TextField'
import { StyledCard, StyledHeader } from './common'

export default function Secret() {
  return (
    <>
      <StyledHeader variant="h5">{'Secret'}</StyledHeader>
      <StyledCard>
        {/* TODO - should be autocomplete with option to add new values */}
        {/*        on selecting old values add button to remove */}
        <TextField placeholder="YOUR-SECRET-HERE" sx={{ width: '50%' }} />
      </StyledCard>
    </>
  )
}
