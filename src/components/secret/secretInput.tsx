import SaveSecretDialog, { ISaveSecretDialog } from './saveSecretDialog'
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
import DeleteForever from '@mui/icons-material/DeleteForever'
import Box from '@mui/material/Box'
import { ellipsePad } from '../../src/util'
import Tooltip from '@mui/material/Tooltip'
import ConfirmDeleteDialog from './confirmDeleteDialog'

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

  const handleSaveDialog: ISaveSecretDialog['handleSave'] = (secret) => {
    onSave(secret)
    setIsDialogOpen(false)
  }

  return (
    <>
      <SaveSecretDialog
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
  const [secretsMap, addSecret, remSecret] = useLocalSecrets()
  const [secretToDelete, setSecretToDelete] = useState<ISavedSecret>()
  const secrets = Object.values(secretsMap)

  const savedSecret = useMemo(
    () => Object.values(secrets).find(({ value: v }) => v === value),
    [value, secrets]
  )

  const onSecretSave: ITextWithSaveProps['onSave'] = (secret) => {
    addSecret(secret)
    onChange(secret.value)
  }

  const handleClickDelete = (secret: ISavedSecret) => {
    setSecretToDelete(secret)
  }

  const handleDeleteSecret = () => {
    remSecret(secretToDelete as ISavedSecret)
    setSecretToDelete(undefined)
    onChange('')
  }

  const handleCancelDelete = () => {
    setSecretToDelete(undefined)
  }

  return (
    <>
      <Autocomplete
        freeSolo
        renderOption={(props, option) => (
          <li {...props} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ overflow: 'hidden' }}>{ellipsePad(option.label)}</Box>
            <Tooltip title="Delete">
              <IconButton aria-label="delete secret" onClick={() => handleClickDelete(option)} edge="end">
                <DeleteForever color="secondary" fontSize="small" />
              </IconButton>
            </Tooltip>
          </li>
        )}
        options={secrets}
        getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
        value={savedSecret?.label || value}
        renderInput={(params) =>
          savedSecret ? (
            <TextField {...params} />
          ) : (
            <TextWithSave onSave={onSecretSave} value={value} {...params} />
          )
        }
        sx={{ width: '50%' }}
        PopperComponent={CustomPopper}
        ListboxProps={{
          style: {
            maxHeight: '500px',
          },
        }}
        onInputChange={(_e, value) => onChange(secretsMap[value]?.value || value)}
      />
      <ConfirmDeleteDialog
        secret={secretToDelete}
        handleClose={handleCancelDelete}
        handleDelete={handleDeleteSecret}
      />
    </>
  )
}
