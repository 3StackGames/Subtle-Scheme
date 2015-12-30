import config from '../.env'
import { SocketEngine } from 'digital-compass-client'

let socketEngine = new SocketEngine(config)

export default socketEngine
