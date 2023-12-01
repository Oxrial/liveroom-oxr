import JSEncrypt from 'jsencrypt-oxr'
const useRsa = (publicKey: string) => {
    if (!publicKey) return
    const rsa = new JSEncrypt()
    rsa.setPublicKey(publicKey)
    return rsa
}
export { useRsa }
