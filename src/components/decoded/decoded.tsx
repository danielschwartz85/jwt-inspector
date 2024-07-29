import { Stack } from '@mui/material'
import { StyledCard, StyledHeader } from '../common/common'
import { jsonPrettyStr, safeJsonParse } from '../../src/util'
import TextFieldCopy from '../common/textFieldCopy'

export interface IDecodedProps {
  payload: string
  header: string
  exp?: Date
  iat?: Date
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
  const { payload, header, exp, iat, onHeaderChange, onPayloadChange } = props

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

  const tooltip = [
    exp ? `🕑 Expires on ${exp?.toISOString()}` : undefined, 
    iat ? `📝 Issued at ${iat?.toISOString()}` : ''
  ].filter(Boolean).join('\n')

  return (
    <>
      <StyledHeader variant="h4">{'Decoded'}</StyledHeader>
      <StyledCard>
        <Stack spacing={1}>
          <TextFieldCopy
            ariaLabel="decoded header input"
            id="header"
            minRows={4}
            maxRows={8}
            value={header}
            error={!isValid(header)}
            onChange={onHeaderChange}
            onBlur={onBlur}
          />
          <TextFieldCopy
            ariaLabel="decoded payload input"
            id="payload"
            minRows={8}
            maxRows={12}
            value={payload}
            error={!isValid(payload)}
            onChange={onPayloadChange}
            onBlur={onBlur}
            title={tooltip}
          />
        </Stack>
      </StyledCard>
    </>
  )
}
