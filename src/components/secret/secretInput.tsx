import SecretDialog, { ISecretDialogProps } from './secretDialog'
import { useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import { ISavedSecret } from '../../src/state'
import { useMemo } from 'react'
import { useLocalSecrets } from '../common/common'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Save from '@mui/icons-material/Save'
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

export interface ISecretInputProps {
  value?: string
  onChange: (secret: string) => void
}

export default function SecretInput(props: ISecretInputProps) {
  const { value, onChange } = props
  const [secretsMap, addSecret] = useLocalSecrets()
  const secrets = Object.values(secretsMap)

  const savedSecret = useMemo(
    () => Object.values(secrets).find(({ value: v }) => v === value),
    [value, secrets]
  )

  const onSecretSave: ITextWithSaveProps['onSave'] = (secret) => {
    addSecret(secret)
    onChange(secret.value)
  }

  return (
    <Autocomplete
      freeSolo
      // TODO - custom secrets with [x] delete button
      options={secrets}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
      value={savedSecret?.label || value}
      renderInput={(params) => <TextWithSave onSave={onSecretSave} value={value} {...params} />}
      sx={{ width: '50%' }}
      PopperComponent={CustomPopper}
      ListboxProps={{
        style: {
          maxHeight: '500px',
        },
      }}
      onInputChange={(_e, value) => onChange(secretsMap[value]?.value || value)}
    />
  )
}
