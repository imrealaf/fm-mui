import React from 'react'
import {
  Grid,
  List,
  ListItem,
  IconButton,
  TextField,
  Typography,
  styled,
  InputAdornment,
  Collapse
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { TransitionGroup } from 'react-transition-group'
import { ChangeEventData, handleTextChange } from 'fm-mui'

import { useApp } from 'hooks'

const StyledList = styled(List)<{ editMode: boolean }>(
  ({ theme, editMode }) => ({
    paddingTop: theme.spacing(0.5),
    '.MuiListItem-root': {
      borderBottom: editMode ? `1px solid ${theme.palette.grey2.main}` : 'none',

      '&:last-of-type': {
        border: 'none'
      }
    }
  })
)

interface EditableListProps {
  items: string[]
  label?: string
  name?: string
  value: string
  noItemsText?: string
  onAddItem(): void
  onDeleteItem(index: number): void
  onChange(data: ChangeEventData): void
}

function EditableList({
  items = [],
  value,
  name,
  label = 'Add item',
  onAddItem,
  onDeleteItem,
  onChange,
  noItemsText = '-'
}: EditableListProps) {
  const { editMode } = useApp()

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onAddItem()
    }
  }

  return (
    <Grid container>
      {editMode && (
        <Grid item xs={12} mb={1}>
          <TextField
            variant='outlined'
            fullWidth
            size='small'
            label={label}
            value={value}
            onKeyDown={handleKeyDown}
            onChange={(e) => handleTextChange(e, onChange)}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    aria-label='delete'
                    disabled={!value.length}
                    onClick={() => onAddItem()}
                  >
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
      )}
      <Grid item xs={12}>
        {!editMode && name && (
          <Typography variant='caption' color='grey6.main'>
            {name}
          </Typography>
        )}
        <StyledList dense={!editMode} editMode={editMode} disablePadding>
          <TransitionGroup>
            {items.map((item: string, index: number) => (
              <Collapse key={item}>
                <ListItem
                  disableGutters
                  secondaryAction={
                    editMode && (
                      <IconButton
                        edge='end'
                        aria-label='delete'
                        onClick={() => onDeleteItem(index)}
                      >
                        <DeleteIcon fontSize='small' />
                      </IconButton>
                    )
                  }
                >
                  {item}
                </ListItem>
              </Collapse>
            ))}
          </TransitionGroup>
        </StyledList>
        {!items.length && !editMode && <Typography>{noItemsText}</Typography>}
      </Grid>
    </Grid>
  )
}

export default EditableList
