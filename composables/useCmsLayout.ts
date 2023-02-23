import { useContent, extractImage, extractComponents } from '@vsf-enterprise/contentful'
import { computed } from '@nuxtjs/composition-api'

const useCmsLayout = () => {
  const { search: searchStyleGuide, content: styleGuide } = useContent('style-guide')
  const { search: searchLayout, content: layout } = useContent('layout')

  const getLayout = () =>
    Promise.all([
      searchStyleGuide({
        custom: {
          type: 'StyleGuide',
          field: 'title',
          value: 'Page Style Guide',
        },
      }),
      searchLayout({
        custom: {
          type: 'layout',
          field: 'title',
          value: 'cms-layout',
        },
      }),
    ])

  const header = computed(() => {
    const extractedHeader = layout.value.length && layout.value[0].fields.header

    return {
      logo: extractedHeader ? extractImage(extractedHeader.fields.logo) : { url: null, alt: null },
      navigation: extractedHeader
        ? extractedHeader.fields.navigation.filter((item) => item.fields).map(({ fields }) => ({ ...fields }))
        : [],
    }
  })

  const footer = computed(() => {
    const extractedFooter = layout.value.length && extractComponents([layout.value[0].fields.footer])[0].props

    return {
      items: extractedFooter
        ? extractedFooter.items.map((item) => {
            return {
              ...item,
              items: item.items.map(({ fields }) => fields),
            }
          })
        : [],
    }
  })

  return {
    getLayout,
    styleGuide,
    header,
    footer,
  }
}

export default useCmsLayout