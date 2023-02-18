import React from 'react'
import {
  Accordion as MuiAccordion,
  AccordionProps as MuiAccordionProps,
  AccordionSummary,
  AccordionSummaryProps,
  AccordionDetails,
  AccordionDetailsProps,
  SvgIcon,
  styled
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export interface AccordionProps extends MuiAccordionProps {
  id: string
  summary: React.ReactNode
  AccordionSummaryProps?: AccordionSummaryProps
  AccordionDetailsProps?: AccordionDetailsProps
  expandIcon?: typeof SvgIcon
}

const StyledAccordion = styled(MuiAccordion, {
  //   shouldForwardProp: (prop) => prop !== 'drawerWidth'
})<Partial<AccordionProps>>(() => ({}))

const Accordion = ({
  id,
  summary,
  expandIcon = ExpandMoreIcon,
  AccordionSummaryProps,
  AccordionDetailsProps,
  children,
  ...rest
}: AccordionProps) => {
  return (
    <StyledAccordion {...rest}>
      <AccordionSummary
        id={id}
        expandIcon={React.createElement(expandIcon)}
        {...AccordionSummaryProps}
      >
        {summary}
      </AccordionSummary>
      <AccordionDetails {...AccordionDetailsProps}>{children}</AccordionDetails>
    </StyledAccordion>
  )
}

export default Accordion
