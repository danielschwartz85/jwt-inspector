import { useRef, useState, useCallback, useEffect } from 'react'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import CopyButton from '../common/copyButton'

// JWT part colors are defined in src/src/theme.ts

export interface IColoredJwtProps {
  value?: string
  placeholder?: string
  error?: boolean
  onChange: (value: string) => void
  ariaLabel?: string
  inputRef?: (el: HTMLTextAreaElement | null) => void
  onBlur?: () => void
}

function splitJwt(value: string): string[] {
  const first = value.indexOf('.')
  if (first === -1) return [value]
  const second = value.indexOf('.', first + 1)
  if (second === -1) return [value.substring(0, first + 1), value.substring(first + 1)]
  return [
    value.substring(0, first + 1),
    value.substring(first + 1, second + 1),
    value.substring(second + 1),
  ]
}

export default function ColoredJwt(props: IColoredJwtProps) {
  const { value = '', placeholder, error, onChange, ariaLabel, inputRef, onBlur } = props
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const mirrorRef = useRef<HTMLDivElement | null>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [localValue, setLocalValue] = useState(value)
  const theme = useTheme()

  // When not focused, sync local state to prop value
  useEffect(() => {
    if (!isFocused) setLocalValue(value)
  }, [value, isFocused])

  // While focused, use local state so typing works even if parent
  // keeps passing the same prop (e.g. empty string during isAppStart)
  const displayValue = isFocused ? localValue : value

  const handleChange = (newValue: string) => {
    setLocalValue(newValue)
    onChange(newValue)
  }

  const setRef = useCallback(
    (el: HTMLTextAreaElement | null) => {
      textareaRef.current = el
      inputRef?.(el)
    },
    [inputRef],
  )

  const syncScroll = () => {
    if (textareaRef.current && mirrorRef.current) {
      mirrorRef.current.scrollTop = textareaRef.current.scrollTop
    }
  }


  const borderColor = error
    ? theme.palette.error.main
    : isFocused
      ? theme.palette.primary.main
      : theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,0.23)'
        : 'rgba(0,0,0,0.23)'

  // Compensate for the extra 1px border on focus so content doesn't shift
  const pad = isFocused ? '15.5px 13px' : '16.5px 14px'
  const padRight = isFocused ? '55px' : '56px'

  const jwtColors = [theme.jwt.header, theme.jwt.payload, theme.jwt.signature]
  const parts = splitJwt(displayValue)
  const showPlaceholder = !displayValue && !!placeholder

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: 'relative',
        border: isFocused ? '2px solid' : '1px solid',
        borderColor,
        borderRadius: 1,
        transition: 'border-color 0.2s',
        '&:hover': {
          borderColor: error
            ? theme.palette.error.main
            : isFocused
              ? theme.palette.primary.main
              : theme.palette.text.primary,
        },
        cursor: 'text',
      }}
      onClick={() => textareaRef.current?.focus()}
    >
      {/* Colored mirror layer */}
      <Box
        ref={mirrorRef}
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          p: pad,
          pr: padRight,
          fontFamily: '"Fira Code", monospace',
          fontSize: '1rem',
          lineHeight: 1.5,
          letterSpacing: '0.00938em',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          overflow: 'auto',
          pointerEvents: 'none',
        }}
      >
        {showPlaceholder ? (
          <Box
            component="span"
            sx={{
              color: 'text.disabled',
              '@keyframes blink': {
                '0%, 100%': { opacity: 1 },
                '50%': { opacity: 0 },
              },
              animation: 'blink 1.2s ease-in-out infinite',
            }}
          >
            {placeholder}
          </Box>
        ) : (
          parts.map((part, i) => (
            <Box key={i} component="span" sx={{ color: jwtColors[i] || jwtColors[2] }}>
              {part}
            </Box>
          ))
        )}
      </Box>

      {/* Actual textarea – transparent text so caret is visible */}
      <textarea
        ref={setRef}
        value={displayValue}
        aria-label={ariaLabel}
        spellCheck={false}
        data-gramm={false}
        data-gramm_editor={false}
        data-enable-grammarly={false}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false)
          onBlur?.()
        }}
        onScroll={syncScroll}
        style={{
          position: 'relative',
          width: '100%',
          height: '240px',
          padding: pad,
          paddingRight: padRight,
          fontFamily: '"Fira Code", monospace',
          fontSize: '1rem',
          lineHeight: 1.5,
          letterSpacing: '0.00938em',
          background: 'transparent',
          color: 'transparent',
          caretColor: theme.palette.text.primary,
          border: 'none',
          outline: 'none',
          resize: 'none',
          overflow: 'auto',
          boxSizing: 'border-box',
          wordBreak: 'break-all',
        }}
      />

      <CopyButton value={displayValue} visible={!error && isHovered && !!displayValue} />
    </Box>
  )
}
