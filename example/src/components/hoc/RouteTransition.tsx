import React from 'react'
import { useLocation } from 'react-router-dom'

export interface RouteTransitionProps {
  effect?: 'fade' | 'slide'
  children: React.ReactNode
}

const RouteTransition = ({
  effect = 'fade',
  children
}: RouteTransitionProps) => {
  const location = useLocation()
  const [transitionStage, setTransitionStage] = React.useState('in')
  const [displayLocation, setDisplayLocation] = React.useState(location)

  React.useEffect(() => {
    if (location !== displayLocation) setTransitionStage('out')
  }, [location, displayLocation])

  return (
    <div
      className={`${effect}-${transitionStage}`}
      onAnimationEnd={() => {
        if (transitionStage === 'out') {
          setTransitionStage('in')
          setDisplayLocation(location)
        }
      }}
    >
      {children}
    </div>
  )
}

export default RouteTransition
