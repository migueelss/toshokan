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

<div class="flex items-center gap-2 px-4 py-2  shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
  <img src="/search.svg" alt="Search" class="h-5 w-5" />
  <input
    type="text"
    placeholder="Search..."
    bind:value={query}
    class="bg-transparent focus:outline-none"
  />
</div>