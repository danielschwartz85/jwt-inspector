import { StyledCard, StyledHeader } from './common'
import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { CheckCircleOutline, ErrorOutline, Save } from '@mui/icons-material'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

type INewSecretProps = AutocompleteRenderInputParams & { value?: string }

function TextWithSave(props: INewSecretProps) {
  const { value, InputProps } = props
  const handleClickSave = () => alert('coming soon..')

  const handleMouseDownSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <TextField
      {...props}
      InputProps={{
        ...InputProps,
        endAdornment: (
          <InputAdornment position="end">
            {value && (
              <IconButton
                aria-label="save secret"
                onClick={handleClickSave}
                onMouseDown={handleMouseDownSave}
                edge="end"
                sx={{ mr: -1 }}
              >
                <Save />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
      label={value ? undefined : 'YOUR SECRET HERE'}
      value={value}
    />
  )
}

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
          <Autocomplete
            freeSolo
            options={
              [
                // { label: 'cnc', id: '12345' },
                // { label: 'lala', id: 'lala' },
              ]
            }
            disableClearable
            renderInput={(params) => <TextWithSave value={value} {...params} />}
            sx={{ width: '50%' }}
            onInputChange={(_e, value) => onChange(value)}
          />
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
