<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { onMount } from "svelte";

  let openSearch = false;
  let query = "";
  let timeout: ReturnType<typeof setTimeout>;
  const dispatch = createEventDispatcher();

  $: if (query) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch("search", query);
    }, 300);
  }

  function toggleSearch() {
    openSearch = !openSearch;
    if (!openSearch) query = "";
  }

  let isMobile = false;

  onMount(() => {
    const checkIsMobile = () => {
      isMobile = window.innerWidth < 640;
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  });
</script>

<div
  class="fixed z-50 bottom-5 right-20 sm:top-22 sm:left-6 sm:bottom-auto sm:right-auto
         flex items-center bg-white/90 dark:bg-neutral-900/90
         border border-neutral-200 dark:border-neutral-800
         rounded-xl backdrop-blur-md shadow-lg overflow-hidden transition-all duration-300
         focus-within:ring-2 focus-within:ring-blue-500"
  style="width: {openSearch ? (isMobile ? 'calc(100vw - 6rem)' : 'calc(100vw - 4rem)') : '3.5rem'}; height: 3.5rem;"
>
  <button
    aria-label={openSearch ? "Close Search" : "Open Search"}
    class="w-14 h-14 flex items-center justify-center
           hover:bg-blue-50 dark:hover:bg-blue-600/10
           active:bg-blue-100 dark:active:bg-blue-950/30
           text-neutral-900 dark:text-white
           transition-colors duration-200
           rounded-lg outline-none border-none"
    on:click={toggleSearch}
  >
    <img
      src="/search.svg"
      alt="Search"
      class="w-6 h-6 transition-all duration-200"
    />
  </button>

  {#if openSearch}
    <input
      type="text"
      placeholder="Search..."
      bind:value={query}
      class="bg-transparent flex-grow focus:outline-none px-2 text-neutral-900 dark:text-white"
      autofocus
    />
  {/if}
</div>
