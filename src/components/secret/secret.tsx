import { StyledCard, StyledHeader } from '../common/common'

import ErrorOutline from '@mui/icons-material/ErrorOutline'
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline'

import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import SecretInput from './secretInput'

export interface ISecretProps {
  value?: string
  isVerified: boolean
  onChange: (secret: string) => void
}

export function SignatureTooltip(props: { children: JSX.Element; value: string }) {
  const { value, children } = props
  return (
    <Tooltip title={<Typography fontSize={'subtitle2.fontSize'}>{value}</Typography>} placement="left">
      {children}
    </Tooltip>
  )
}

export default function Secret(props: ISecretProps) {
  const { value, onChange, isVerified } = props

  return (
    <>
      <StyledHeader variant="h5">{'Secret'}</StyledHeader>
      <StyledCard>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <SecretInput value={value} onChange={onChange} />
          {isVerified ? (
            <SignatureTooltip value="Verified">
              <CheckCircleOutline sx={{ pr: 2, fontSize: 30, color: 'success.main' }} />
            </SignatureTooltip>
          ) : (
            <SignatureTooltip value="Invalid">
              <ErrorOutline sx={{ pr: 2, fontSize: 30, color: 'error.main' }} />
            </SignatureTooltip>
          )}
        </Box>
      </StyledCard>
    </>
  )
}
