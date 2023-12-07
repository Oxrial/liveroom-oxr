export const _renderCheck = (pre = '', i = 1) => {
    return () => {
        console.log(`${pre} Render ${i}`)
        i++
    }
}
