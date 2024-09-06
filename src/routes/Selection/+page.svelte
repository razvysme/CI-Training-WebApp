<script>
    import SongCover from "../../components/SongCover.svelte";
    import Finish from "../../components/Finish.svelte";
    import { listenMatrix } from "../../stores/trackIndexStore.js";
    import { browser } from '$app/environment';
    
    let trackIndices = [0, 4, 8, 12, 16, 20];
    let showSongCovers = false;

    function isTestCompleted(listenMatrix) {
    	  return listenMatrix.every(row => row.every(item => item === 1));
    }

    function continueMusic() {
        showSongCovers = true;
    }

    if (browser) { 
      try {
        const listenMatrixCookie = document.cookie.split('; ').find(row => row.startsWith('listenLog='));
        if (listenMatrixCookie) {
            const listenMatrixEncoded = listenMatrixCookie.split('=')[1]
            const decodedCookieValue = decodeURIComponent(listenMatrixEncoded);
            const restoredListenMatrix = JSON.parse(decodedCookieValue);
            console.log("Restored listen matrix is: "+ restoredListenMatrix);
            for (let i = 0; i < 6; i++){
              for (let j = 0; j < 4; j++){
                listenMatrix[i][j] = restoredListenMatrix[i][j];
              }}
        } else {
          for (let i = 0; i < 6; i++){
            for (let j = 0; j < 4; j++){
              listenMatrix[i][j] = 0;
          }}
          throw new Error('No listenMatrix cookie found. Defaulting to ' + listenMatrix);
        }
      }
        catch (error) {
          console.log(error.message);
      }
      

    }

</script>

<main style="display: grid; grid-template-columns: repeat(1, 1fr); grid-gap: 1rem;">
  <div>
    {#if isTestCompleted(listenMatrix) && !showSongCovers}
      <Finish />
      <button   type="button"
                class="mt-3 mb-11 w-full shadow-sm rounded bg-sky-500 hover:bg-sky-600 text-lg text-white py-2 px-4"
                on:click={continueMusic}>
                Fortsætte med at lytte
        </button>
    {:else}
      {#each trackIndices as trackIndex}
        <div>
            <SongCover {trackIndex} />
        </div>
      {/each}
    {/if}
  </div>
</main>
