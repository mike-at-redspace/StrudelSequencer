/**
 * Provider for active tool state context
 * @module context/ActiveToolContext
 */

import PropTypes from 'prop-types'
import { useActiveTool } from '@/hooks'
import { ActiveToolContext } from './ActiveToolContext.js'

/**
 * Provider component that wraps the app with active tool state context
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Context provider element
 */
export function ActiveToolProvider({ children }) {
  const activeToolState = useActiveTool()

  return <ActiveToolContext.Provider value={activeToolState}>{children}</ActiveToolContext.Provider>
}

ActiveToolProvider.propTypes = {
  children: PropTypes.node.isRequired
}
