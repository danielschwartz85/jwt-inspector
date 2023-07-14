import TextField from '@mui/material/TextField'
import { StyledCard, StyledHeader } from './common'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { ContentCopy } from '@mui/icons-material'

export interface IEncodedProps {
  value?: string
  onChange: (encoded: string) => void
}

function isValid(encoded: string): boolean {
  return /^[^.]+\.[^.]+\.[^.]+$/.test(encoded)
}

export default function Encoded(props: IEncodedProps) {
  const { value, onChange } = props

  const handleClickCopy = () => {
    if (!value) return
    navigator.clipboard.writeText(value)
  }

  const handleMouseDownCopy = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <>
      <StyledHeader variant="h4">{'Encoded'}</StyledHeader>
      <StyledCard>
        <TextField
          placeholder="Paste JWT.."
          multiline
          rows={10}
          fullWidth={true}
          spellCheck={false}
          value={value}
          error={!!value && !isValid(value)}
          onChange={(e) => onChange(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {value && (
                  <IconButton
                    aria-label="copy jwt"
                    onClick={handleClickCopy}
                    onMouseDown={handleMouseDownCopy}
                    edge="end"
                    sx={{ mr: -1, ml: -2, mb: -25 }}
                  >
                    <ContentCopy />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      </StyledCard>
    </>
  )
}
