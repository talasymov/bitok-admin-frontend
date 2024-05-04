export const required = (v: any) => !!v || 'Field is required'

export const image_rules = [
    (value) => {
        return !value || !value.length || value[0].size < 2000000 || 'Avatar size should be less than 2 MB!'
    }
]
