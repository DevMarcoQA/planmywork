import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  es: {
    translation: {
      brand: 'PlanMyWork',
      hero: {
        kicker: 'PlanMyWork',
        title: 'Plantilla Vite + React + Tailwind lista para construir',
        description:
          'Tailwind CSS ya está configurado. Empieza editando este componente en {{path}} y añade tus propias vistas.',
        path: 'src/App.jsx',
      },
      links: {
        tailwind: {
          title: 'Tailwind',
          description: 'Utilidades y ejemplos',
        },
        react: {
          title: 'React',
          description: 'Guía oficial',
        },
        vite: {
          title: 'Vite',
          description: 'Herramientas y plugins',
        },
      },
      language: {
        label: 'Idioma',
        es: 'Español',
        en: 'Inglés',
      },
    },
  },
  en: {
    translation: {
      brand: 'PlanMyWork',
      hero: {
        kicker: 'PlanMyWork',
        title: 'Vite + React + Tailwind starter ready to build',
        description:
          'Tailwind CSS is set up. Start by editing this component at {{path}} and add your own views.',
        path: 'src/App.jsx',
      },
      links: {
        tailwind: {
          title: 'Tailwind',
          description: 'Utilities and examples',
        },
        react: {
          title: 'React',
          description: 'Official guide',
        },
        vite: {
          title: 'Vite',
          description: 'Tools and plugins',
        },
      },
      language: {
        label: 'Language',
        es: 'Spanish',
        en: 'English',
      },
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'es',
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n

