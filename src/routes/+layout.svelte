<script lang="ts">
	import '../app.css';
    import FloatingMenu from "../components/floatingmenu.svelte";
	let { children } = $props();
</script>

<FloatingMenu />
{@render children()}
