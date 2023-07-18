import { Stack } from '@mui/material'
import { StyledCard, StyledHeader } from './common'
import { jsonPrettyStr, safeJsonParse } from '../src/util'
import TextFieldCopy from './textFieldCopy'

export interface IDecodedProps {
  payload: string
  header: string
  onPayloadChange: (payload: string) => void
  onHeaderChange: (header: string) => void
}

export function isValid(str: string): boolean {
  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}

export default function JwtInput(props: IDecodedProps) {
  const { payload, header, onHeaderChange, onPayloadChange } = props

  const onBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const obj = safeJsonParse(e.target.value)
    const pretty = obj ? jsonPrettyStr(obj) : undefined
    if (!pretty) {
      return
    }
    if (e.target.id === 'header' && pretty !== header) {
      onHeaderChange(pretty)
    }
    if (e.target.id === 'payload' && pretty !== payload) {
      onPayloadChange(pretty)
    }
  }

  return (
    <>
      <StyledHeader variant="h4">{'Decoded'}</StyledHeader>
      <StyledCard>
        <Stack spacing={1}>
          <TextFieldCopy
            id="header"
            minRows={4}
            maxRows={8}
            value={header}
            error={!isValid(header)}
            onChange={onHeaderChange}
            onBlur={onBlur}
          />
          <TextFieldCopy
            id="payload"
            minRows={8}
            maxRows={12}
            value={payload}
            error={!isValid(payload)}
            onChange={onPayloadChange}
            onBlur={onBlur}
          />
        </Stack>
      </StyledCard>
    </>
  )
}
