# Book db client

A hybrid mobile app that allows users to keep track of their book collection.  
The web version is available online [here](https://bookdb.brojor.me/).

## API

Backend RESTful [API](https://github.com/brojor/book-db-server)

## Technologies used

- :green_heart:  **[Vue 3](https://vuejs.org/)** - Approachable, performant and versatile JavaScript framework
- 🦾  **[TypeScript](https://www.typescriptlang.org/)** - JavaScript with syntax for types
- 🔮  **[Anu](https://anu-vue.netlify.app/)** - DX focused utility based component library
- :wrench:  **[Capacitor](https://capacitorjs.com/)** - Cross-platform native runtime for web apps.
- ⚛️  **[UnoCSS](https://github.com/unocss/unocss)** - Instant on-demand [Atomic CSS](https://antfu.me/posts/reimagine-atomic-css) engine
- 🌎  **[Vue I18n](https://vue-i18n.intlify.dev/)** - Internationalization plugin
- 💎  **[Pure CSS Icons](https://github.com/unocss/unocss/tree/main/packages/preset-icons/)** - Allows to use any icon using a single class
- ✅  **[VeeValidate](https://vee-validate.logaretm.com/v4/)** - Form validation library
- :small_blue_diamond:  **[Zod](https://github.com/colinhacks/zod)** - TypeScript-first validation schema builder
- ⚡️  **[Vite](https://vitejs.dev/)** - Lightning Fast Bundler
- 🤖  **[unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) + [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)** - Auto import components and APIs on demand

## Building app for mobile devices

1. Install dependecies

```bash
# pnpm
pnpm install
# yarn
yarn install
# npm
npm install 
```

2. Build web code

```bash
# pnpm
pnpm run build
# yarn
yarn run build
# npm
npm run build
```

3. Copy Web Code to native project

```bash
npx cap copy
```

4. Building Native Project

```bash
# Android
npx cap copy android
npx cap open android
# iOS
npx cap copy ios
npx cap open ios
```
