export const jsonify = (resp: any) => JSON.parse(JSON.stringify(resp, (_key, value) => {
    return typeof value === 'bigint' ? value = value.toString() : value
    }))