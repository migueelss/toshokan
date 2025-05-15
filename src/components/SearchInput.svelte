<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  let query = "";
  let timeout: ReturnType<typeof setTimeout>;

  $: if (query) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch("search", query);
    }, 300);
  }
</script>

<input
  type="text"
  placeholder="Search..."
  bind:value={query}
/>
