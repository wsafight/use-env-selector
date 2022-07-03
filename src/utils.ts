export const setValue = (key: string, value: any, context: any) => {
    let root = context
    const names = key.split('.')
    const count = names.length;
    const name = names[count - 1]

    if (count > 1) {
        for (const currentName of names.slice(0, count - 1)) {
            let current = root[currentName]
            if (current === undefined) {
                current = root[currentName] = {}
            }
            root = current
        }
    }

    root[name] = value
}

export const defaultEqualFn = (a: any, b: any) => a === b