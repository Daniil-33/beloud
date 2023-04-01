# beloud

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
## Vue Component Names

```html
<!-- recommended -->
<app-header></app-header>
<user-list></user-list>
<range-slider></range-slider>

<!-- avoid -->
<btn-group></btn-group> <!-- short, but unpronounceable. use `button-group` instead -->
<ui-slider></ui-slider> <!-- all components are ui elements, so is meaningless -->
<slider></slider> <!-- not custom element spec compliant -->
```

## Keep component props primitive

```html
<!-- recommended -->
<range-slider
  :values="[10, 20]"
  :min="0"
  :max="100"
  :step="5"
  @on-slide="updateInputs"
  @on-end="updateResults">
</range-slider>

<!-- avoid -->
<range-slider :config="complexConfigObject"></range-slider>
```

## Component structure

```html
<template>
  <div
    v-bind=""
    statles-props
    :dynamic-props="true"
    @events=""
  >
    <!-- ... -->
  </div>
</template>

<script>
  export default {
      
    // Do not forget this little guy
    name: 'MyAwesomeComponent',
      
    // component properties/variables
    props: {},
      
    // variables
    data() {},
    computed: {},
      
    // when component uses other components
    components: {},
      
    // methods
    watch: {},
    methods: {},
      
    // Lifecycle hooks
    beforeCreate() {},
    mounted() {},
};
</script>

<style module lang="scss">
</style>
```
