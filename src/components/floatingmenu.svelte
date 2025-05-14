<script lang="ts">
    import { onMount } from "svelte";
    let open = false;
    let isDark = false;
  
    function updateTheme(fromStorage = false) {

      if (fromStorage) {
        const stored = localStorage.getItem("theme");
        if (stored === "dark") {
          document.documentElement.classList.add("dark");
          isDark = true;
          return;
        }
        if (stored === "light") {
          document.documentElement.classList.remove("dark");
          isDark = false;
          return;
        }
      }
      isDark = document.documentElement.classList.contains("dark");
    }
  
    function toggleTheme() {
      if (isDark) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      }
      updateTheme();
    }
  
    onMount(() => {

      const stored = localStorage.getItem("theme");
      if (stored) {
        updateTheme(true);
      } else {

        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (systemDark) {
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
        updateTheme();
      }

      const observer = new MutationObserver(() => updateTheme());
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    });
  
    const options = [
      {   
        key: "home",
        label: "Home",
        href: "/",
        icon: `
          <img src="/home.svg" alt="Home" class="w-6 h-6
            dark:invert dark:brightness-90
            invert-0 brightness-100
            transition-all duration-150
          " />
        `
      },
      {
        key: "anime",
        label: "Anime",
        href: "/anime",
        icon: `
          <img src="/anime.svg" alt="Anime" class="w-6 h-6
            dark:invert dark:brightness-90
            invert-0 brightness-100
            transition-all duration-150
          " />
        `
      },
      {
        key: "manga",
        label: "Manga",
        href: "/manga",
        icon: `
          <img src="/manga.svg" alt="Manga" class="w-6 h-6
            dark:invert dark:brightness-90
            invert-0 brightness-100
            transition-all duration-150
          " />
        `
      },
      {
        key: "adult",
        label: "Adult",
        href: "/adult",
        icon: `
          <img src="/adult.svg" alt="Adult" class="w-6 h-6
            dark:invert dark:brightness-90
            invert-0 brightness-100
            transition-all duration-150
          " />
        `
      }
    ];
  </script>
  
  <div
    class="fixed z-50 bottom-5 right-5 sm:top-6 sm:left-6 sm:bottom-auto sm:right-auto
           flex flex-col-reverse sm:flex-row items-stretch sm:items-center
           bg-white/90 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800
           rounded-xl backdrop-blur-md shadow-lg
           min-w-[3.5rem] overflow-hidden transition-all duration-300"
  >

    <button
      type="button"
      class="w-14 h-14 flex items-center justify-center cursor-pointer
             bg-transparent group
             transition-colors duration-200
             rounded-lg outline-none border-none
             focus:outline-none"
      on:click={() => (open = !open)}
    >
      <span
        class="flex items-center justify-center transition-colors duration-150"
      >
        {#if !open}
          <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <line x1="4" y1="7" x2="20" y2="7"
              stroke="currentColor"
              class="stroke-blue-600 group-hover:stroke-blue-400 dark:stroke-blue-500 dark:group-hover:stroke-blue-300"
              stroke-linecap="round"/>
            <line x1="4" y1="12" x2="20" y2="12"
              stroke="currentColor"
              class="stroke-blue-600 group-hover:stroke-blue-400 dark:stroke-blue-500 dark:group-hover:stroke-blue-300"
              stroke-linecap="round"/>
            <line x1="4" y1="17" x2="20" y2="17"
              stroke="currentColor"
              class="stroke-blue-600 group-hover:stroke-blue-400 dark:stroke-blue-500 dark:group-hover:stroke-blue-300"
              stroke-linecap="round"/>
          </svg>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7"
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
              class="stroke-blue-600 group-hover:stroke-blue-400 dark:stroke-blue-500 dark:group-hover:stroke-blue-300"/>
          </svg>
        {/if}
      </span>
    </button>
  
    <div
      class="flex flex-col sm:flex-row overflow-hidden
             transition-all duration-300"
      style="will-change: max-height, opacity;"
      class:max-h-0={!open}
      class:opacity-0={!open}
      class:pointer-events-none={!open}
      class:max-h-[25rem]={open}
      class:opacity-100={open}
      class:pointer-events-auto={open}
    >
      {#if open}
        {#each options as opt, i}
          <a
            href={opt.href}
            class="w-14 h-14 flex flex-col items-center justify-center
                   bg-transparent 
                   hover:bg-blue-50 dark:hover:bg-blue-600/10
                   active:bg-blue-100 dark:active:bg-blue-950/30
                   focus:bg-blue-100 dark:focus:bg-blue-950/30
                   text-neutral-900 dark:text-white
                   transition-all duration-200
                   rounded-lg outline-none border-none
                   border-t border-neutral-200 dark:border-neutral-800 sm:border-t-0 sm:border-l
                   animate-fade-in
                   cursor-pointer"
            tabindex="0"
            aria-label={opt.label}
            style="transition-delay: {50 + i*40}ms"
          >
            {@html opt.icon}
            <span class="text-xs text-neutral-700 dark:text-neutral-300 mt-1 font-medium">{opt.label}</span>
          </a>
        {/each}
        <!--(Dark/Light) -->
        <button
          class="w-14 h-14 flex flex-col items-center justify-center
                 bg-transparent 
                 hover:bg-blue-50 dark:hover:bg-blue-600/10
                 active:bg-blue-100 dark:active:bg-blue-950/30
                 focus:bg-blue-100 dark:focus:bg-blue-950/30
                 text-neutral-900 dark:text-white
                 transition-all duration-200
                 rounded-lg outline-none border-none
                 border-t border-neutral-200 dark:border-neutral-800 sm:border-t-0 sm:border-l
                 animate-fade-in
                 cursor-pointer"
          tabindex="0"
          aria-label={isDark ? "Light" : "Dark"}
          on:click={toggleTheme}
          style="transition-delay: {50 + options.length*40}ms"
        >
          {#if isDark}
            <img src="/sun.svg" alt="Light"
              class="w-6 h-6 dark:invert dark:brightness-90 invert-0 brightness-100 transition-all duration-200" />
            <span class="text-xs text-neutral-700 dark:text-neutral-300 mt-1 font-medium">Light</span>
          {:else}
            <img src="/moon.svg" alt="Dark"
              class="w-6 h-6 dark:invert dark:brightness-90 invert-0 brightness-100 transition-all duration-200" />
            <span class="text-xs text-neutral-700 dark:text-neutral-300 mt-1 font-medium">Dark</span>
          {/if}
        </button>
      {/if}
    </div>
  </div>
  
  <style>
    @keyframes fade-in {
      0% { opacity: 0; transform: translateY(16px);}
      100% { opacity: 1; transform: none;}
    }
    .animate-fade-in {
      animation: fade-in 0.32s cubic-bezier(.43,1.3,.6,1) both;
    }
  </style>