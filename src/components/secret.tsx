import { StyledCard, StyledHeader, StyledTextField } from './common'
import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { Save } from '@mui/icons-material'

type INewSecretProps = AutocompleteRenderInputParams & { value: string }

function NewSecret(props: INewSecretProps) {
  const { value, InputProps } = props
  const handleClickShowPassword = () => alert('saved!')

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <StyledTextField
      {...props}
      InputProps={{
        ...InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              <Save />
            </IconButton>
          </InputAdornment>
        ),
      }}
      label="YOUR-SECRET-HERE"
      value={value}
    />
  )
}

export interface ISecretProps {
  value?: string
  onChange: (secret: string) => void
}

export default function Secret(props: ISecretProps) {
  const { value } = props
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
          renderInput={(params) =>
            value ? (
              <NewSecret value={value} {...params} />
            ) : (
              <StyledTextField label="YOUR-SECRET-HERE" {...params} />
            )
          }
          sx={{ width: '50%' }}
        />
      </StyledCard>
    </>
  )
}
