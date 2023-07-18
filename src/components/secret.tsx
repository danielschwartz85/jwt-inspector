import { StyledCard, StyledHeader } from './common'
import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { Save } from '@mui/icons-material'
import TextField from '@mui/material/TextField'

type INewSecretProps = AutocompleteRenderInputParams & { value?: string }

function TextWithSave(props: INewSecretProps) {
  const { value, InputProps } = props
  const handleClickSave = () => alert('Coming soon..')

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
  onChange: (secret: string) => void
}

export default function Secret(props: ISecretProps) {
  const { value, onChange } = props
  return (
    <>
      <StyledHeader variant="h5">{'Secret'}</StyledHeader>
      <StyledCard>
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
      </StyledCard>
    </>
  )
}
