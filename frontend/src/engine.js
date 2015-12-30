import config from '../.env'
import dc from 'digital-compass-client'

let socketEngine = dc.SocketEngine(config)

export default socketEngine
