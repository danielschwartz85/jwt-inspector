import { Card, CardContent, TextField, Typography, styled } from '@mui/material'
import React from 'react'

export const StyledHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}))

export const StyledTextField = styled(TextField)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&.Mui-focused': { color: theme.palette.primary.main },
}))

export function StyledCard({ children }: { children?: React.ReactElement }) {
  return (
    <Card>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
