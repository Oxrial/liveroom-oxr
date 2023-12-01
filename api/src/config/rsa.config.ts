import * as NodeRSA from 'node-rsa'
import { readFileSync } from 'fs'

const privateKey = readFileSync('certs/ca.pem', 'utf-8')
const rsa = new NodeRSA(privateKey)
rsa.setOptions({ encryptionScheme: 'pkcs1' })
export default rsa
