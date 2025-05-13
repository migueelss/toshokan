<script lang="ts">
    import { page } from '$app/stores';
    $: id = $page.params.id;
    $: slug = $page.params.slug;
  </script>
  
  <h1>ID: {id}</h1>
  <h2>Slug: {slug}</h2>