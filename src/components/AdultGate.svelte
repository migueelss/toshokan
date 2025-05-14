<script lang="ts">
    import { onMount } from "svelte";
    let isAdult: boolean | null = null;
  
    onMount(() => {
      const stored = localStorage.getItem("isAdult");
      if (stored === "true") isAdult = true;
      else if (stored === "false") isAdult = false;
    });
  
    function confirmAdult() {
      isAdult = true;
      localStorage.setItem("isAdult", "true");
    }
  </script>
  
  {#if isAdult === null}
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div class="bg-white dark:bg-neutral-900 p-8 rounded-xl shadow-xl flex flex-col items-center max-w-sm mx-auto">
        <img
          src="/adult.svg"
          alt="Adult"
          class="w-16 h-16 mb-4 opacity-80 adult-icon"
        />
        <h2 class="text-2xl font-bold mb-2 text-center">Adult content</h2>
        <p class="text-center mb-6 text-neutral-700 dark:text-neutral-300">
          This page contains adult content (18+). Are you sure you are of legal age?
        </p>
        <button
          on:click={confirmAdult}
          class="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition"
        >
          I am of legal age
        </button>
      </div>
    </div>
  {:else if isAdult}
    <slot />
  {:else}
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div class="bg-white dark:bg-neutral-900 p-8 rounded-xl shadow-xl flex flex-col items-center max-w-sm mx-auto">
        <img
          src="/adult.svg"
          alt="Adult"
          class="w-16 h-16 mb-4 opacity-80 adult-icon"
        />
        <h2 class="text-2xl font-bold mb-2 text-center">Access denied</h2>
        <p class="text-center mb-6 text-neutral-700 dark:text-neutral-300">
          This content is restricted to people 18 years old or older.
        </p>
      </div>
    </div>
  {/if}
  
  <style>
  .adult-icon {
    filter: none;
  }
  :global(html.dark) .adult-icon {
    filter: brightness(0) invert(1) drop-shadow(0 0 2px #fff);
  }
  </style>