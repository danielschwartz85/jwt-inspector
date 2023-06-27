import TextField from '@mui/material/TextField'
import { StyledCard, StyledHeader } from './common'

export default function Encoded() {
  return (
    <>
      <StyledHeader variant="h4">{'Encoded'}</StyledHeader>
      <StyledCard>
        <TextField placeholder="Paste JWT.." multiline rows={10} fullWidth={true} />
      </StyledCard>
    </>
  )
}
