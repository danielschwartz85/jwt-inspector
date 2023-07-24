import useMediaQuery from '@mui/material/useMediaQuery/useMediaQuery'
import React, { useEffect, useState } from 'react'
import createTheme, { Theme } from '@mui/material/styles/createTheme'
import { DarkTheme, LightTheme } from '../src/theme'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import styled from '@mui/material/styles/styled'
import Typography from '@mui/material/Typography'
import { ISavedSecret } from '../src/state'
import { SecretManager } from '../src/util'

export const StyledHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}))

export function StyledCard({ children }: { children?: React.ReactElement }) {
  return (
    <Card>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export function useUserTheme(): [Theme, boolean, () => void] {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const localStorageMode = localStorage.getItem('themeMode')
  const userPrefersDark = (!localStorageMode && prefersDarkMode) || localStorageMode === 'dark'
  const [isDarkMode, setIsDarkMode] = useState(userPrefersDark)
  const theme = React.useMemo(() => createTheme(isDarkMode ? DarkTheme : LightTheme), [isDarkMode])

  useEffect(() => {
    localStorage.setItem('themeMode', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode((isDarkMode) => !isDarkMode)
  }

  return [theme, isDarkMode, toggleDarkMode]
}

export function useSecrets(): [Record<string, ISavedSecret>, (secret: ISavedSecret) => void] {
  const localStorageSecrets = SecretManager.getSecrets()
  const [secrets, setSecrets] = useState(localStorageSecrets)

  useEffect(() => {
    SecretManager.saveSecrets(secrets)
  }, [secrets])

  const addSecret = (secret: ISavedSecret) => {
    setSecrets((secrets) => ({ ...secrets, [secret.label]: secret }))
  }

  return [secrets, addSecret]
}
