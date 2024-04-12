export const useTableHeaders = (headers) => {
    const {t} = useI18n()

    return headers.map((header) => {
        header.title = t(header.title)
        return header
    })
}