import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  es: {
    translation: {
      brand: 'PlanMyWork',
      nav: {
        home: 'Inicio',
        items: 'Crear ítems',
        calendar: 'Calendario',
      },
      hero: {
        kicker: 'PlanMyWork',
        title: 'Plantilla Vite + React + Tailwind lista para construir',
        description:
          'Tailwind CSS ya está configurado. Empieza editando este componente en {{path}} y añade tus propias vistas.',
        path: 'src/pages/HomePage.jsx',
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
      items: {
        title: 'Crear ítems',
        subtitle: 'Centraliza tus tareas o elementos de trabajo',
        helper:
          'Usa este espacio para crear nuevos ítems que luego podrás ver en el calendario.',
        action: 'Crear nuevo ítem',
        draft: 'Aquí puedes colocar tu formulario de creación.',
      },
      calendar: {
        title: 'Calendario',
        subtitle: 'Visualiza tus ítems en una línea temporal',
        helper:
          'Integra aquí tu calendario o agenda para organizar las fechas clave.',
        empty: 'Sin eventos aún. Crea un ítem para empezar.',
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
      nav: {
        home: 'Home',
        items: 'Create items',
        calendar: 'Calendar',
      },
      hero: {
        kicker: 'PlanMyWork',
        title: 'Vite + React + Tailwind starter ready to build',
        description:
          'Tailwind CSS is set up. Start by editing this component at {{path}} and add your own views.',
        path: 'src/pages/HomePage.jsx',
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
      items: {
        title: 'Create items',
        subtitle: 'Centralize your tasks or work items',
        helper:
          'Use this area to create new items that you can later view on the calendar.',
        action: 'Create new item',
        draft: 'Place your creation form here.',
      },
      calendar: {
        title: 'Calendar',
        subtitle: 'See your items on a timeline',
        helper:
          'Plug in your calendar/agenda here to organize key dates.',
        empty: 'No events yet. Create an item to get started.',
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

