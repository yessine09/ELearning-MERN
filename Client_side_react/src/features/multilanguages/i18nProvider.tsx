import { FC, ReactNode } from 'react'
import { IntlProvider } from 'react-intl'
import { useLang } from './i18n'


import arMessages from './messages/ar.json'
import enMessages from './messages/en.json'
import frMessages from './messages/fr.json'


const allMessages = {
  en: enMessages,
  fr: frMessages,
  ar: arMessages,
}
type WithChildren = {
  children?: ReactNode
}


const I18nProvider: FC<WithChildren> = ({ children }) => {
  const locale = useLang()
  const messages = allMessages[locale]

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  )
}

export { I18nProvider }

