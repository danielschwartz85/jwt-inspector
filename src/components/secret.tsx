import { StyledCard, StyledHeader, useSecrets } from './common'
import Autocomplete from '@mui/material/Autocomplete'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Save from '@mui/icons-material/Save'
import ErrorOutline from '@mui/icons-material/ErrorOutline'
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import SecretDialog, { ISecretDialogProps } from './secretDialog'
import { useMemo, useState } from 'react'
import { ISavedSecret } from '../src/state'
import Popper, { PopperProps } from '@mui/material/Popper'

type ITextWithSaveProps = TextFieldProps & {
  value?: string
  onSave: (secret: ISavedSecret) => void
}

function TextWithSave(props: ITextWithSaveProps) {
  const { value, InputProps, onSave, ...rest } = props
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleClickSaveIcon = () => {
    setIsDialogOpen(true)
  }

  const handleMouseDownSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  const handleSaveDialog: ISecretDialogProps['handleSave'] = (secret) => {
    onSave(secret)
    setIsDialogOpen(false)
  }

  return (
    <>
      <SecretDialog
        initialValue={value as string}
        isOpen={isDialogOpen}
        handleClose={handleCloseDialog}
        handleSave={handleSaveDialog}
      />
      <TextField
        {...rest}
        InputProps={{
          ...InputProps,
          endAdornment: (
            <InputAdornment position="end">
              {value && (
                <IconButton
                  aria-label="save secret"
                  onClick={handleClickSaveIcon}
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
    </>
  )
}

function CustomPopper(props: PopperProps) {
  return <Popper {...props} placement="top-start" />
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
  const [secretsMap, addSecret] = useSecrets()
  const secrets = Object.values(secretsMap)

  const onSecretSave: ITextWithSaveProps['onSave'] = (secret) => {
    addSecret(secret)
    onChange(secret.value)
  }

  const savedSecret = useMemo(
    () => Object.values(secrets).find(({ value: v }) => v === value),
    [value, secrets]
  )

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
            options={secrets}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
            value={savedSecret?.label || value}
            renderInput={(params) => <TextWithSave onSave={onSecretSave} value={value} {...params} />}
            sx={{ width: '50%' }}
            PopperComponent={CustomPopper}
            onInputChange={(_e, value) => onChange(secretsMap[value]?.value || value)}
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
