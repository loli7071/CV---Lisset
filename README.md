# Lisset Dayana Gómez Pérez | Scientific CV

Aplicación React + TailwindCSS para un Curriculum Vitae científico y profesional multilingüe, optimizado para lectura web y exportación a PDF.

## Stack

- React + Vite
- TailwindCSS
- i18next + react-i18next
- Framer Motion
- jsPDF + html2canvas
- Lucide React

## Instalación

```bash
npm install
npm run dev
```

## Producción

```bash
npm run build
npm run preview
```

## Edición del CV

Todo el contenido editable está en:

- `src/translations/es.json`
- `src/translations/en.json`
- `src/translations/pt.json`

La imagen de perfil se configura en `profile.image` dentro de cada JSON. El diseño replica la composición original del CV del 8 de abril: fondo cálido, panel principal claro, acentos verde/oro/azul/rojo y bloque fotográfico lateral.

## PDF

El botón `Descargar CV` exporta el área del CV en el idioma actualmente seleccionado. Para mejores resultados, usa Chrome o Edge y espera a que cargue la foto antes de descargar.
