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
  testId?: string
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
  testId = 'accordion',
  id,
  summary,
  expandIcon = ExpandMoreIcon,
  AccordionSummaryProps,
  AccordionDetailsProps,
  children,
  ...rest
}: AccordionProps) => {
  return (
    <StyledAccordion data-testId={testId} {...rest}>
      <AccordionSummary
        data-testId={`${testId}-summary`}
        id={id}
        expandIcon={React.createElement(expandIcon)}
        {...AccordionSummaryProps}
      >
        {summary}
      </AccordionSummary>
      <AccordionDetails
        data-testId={`${testId}-details`}
        {...AccordionDetailsProps}
      >
        {children}
      </AccordionDetails>
    </StyledAccordion>
  )
}

export default Accordion
