import { StyledCard, StyledHeader } from '../common/common'

import ErrorOutline from '@mui/icons-material/ErrorOutline'
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline'

import SecretInput from './secretInput'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import useTheme from '@mui/material/styles/useTheme'

export interface ISecretProps {
  value?: string
  isVerified: boolean
  onChange: (secret: string) => void
}

export default function Secret(props: ISecretProps) {
  const { value, onChange, isVerified } = props
  const theme = useTheme()
  const greaterThanMid = useMediaQuery(theme.breakpoints.up('md'))

  const iconRightMargin = greaterThanMid ? 2 : 0
  return (
    <>
      <StyledHeader variant="h5">{'Verify Signature'}</StyledHeader>
      <StyledCard>
        <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Grid item md={4} xs={6}>
            <SecretInput value={value} onChange={onChange} />
          </Grid>
          <Grid item sx={{ ml: 'auto', px: 1 }}>
            {isVerified ? (
              <Typography variant={'h6'} sx={{ color: 'success.main', fontWeight: '400' }}>
                Verified
              </Typography>
            ) : (
              <Typography variant={'h6'} sx={{ color: 'error.main', fontWeight: '400' }}>
                Invalid
              </Typography>
            )}
          </Grid>
          <Grid item md={'auto'} xs={'auto'}>
            {isVerified ? (
              <CheckCircleOutline sx={{ pr: iconRightMargin, fontSize: 30, color: 'success.main' }} />
            ) : (
              <ErrorOutline sx={{ pr: iconRightMargin, fontSize: 30, color: 'error.main' }} />
            )}
          </Grid>
        </Grid>
      </StyledCard>
    </>
  )
}
