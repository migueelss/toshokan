<script lang="ts">
  import { page } from '$app/stores';
  import MediaScreen from '../../../../components/mediascreen.svelte';

  $: id = parseInt($page.params.id);
  
</script>

<MediaScreen {id} />