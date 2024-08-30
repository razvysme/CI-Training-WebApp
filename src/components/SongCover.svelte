<script>
    import { audioData } from '../audioData.js';
    import TrackHeading from './TrackHeading.svelte';
    import { goto } from '$app/navigation';
    import LessonCounter from "./LessonCounter.svelte";
    import { currentTrack } from './../stores/trackIndexStore.js';

    export let trackIndex = 1;

    let trackTitle = audioData[trackIndex].name;
    let trackArtist = audioData[trackIndex].artist;
    let coverArt = audioData[trackIndex].cover;
    //console.log(audioData[0], audioData[5], audioData[10],audioData[15], audioData[20]);
    
    function handleClick() {
        //console.log(trackIndex);
        currentTrack.set(trackIndex); // Set the value of trackIndex
        goto(`/Music`);
    }
    //console.log(trackIndex);
</script>

<button class="border border-gray-300 p-2 rounded-lg" on:click={handleClick}>
    <main style="display: flex; align-items: center;">
      <section id="player-cont" style="display: flex; align-items: center; width: 100%;">
        <!-- Cover Art on the Left -->
        <div style="flex: 1 1 20%;">
          <img src={coverArt} alt="Cover Art" style="width: 100%; height: auto;border-radius: 8px" />
        </div>
        <!-- Text on the Right -->
        <div style="flex: 2 1 66%; padding-left: 1rem;">
          <TrackHeading artist={trackArtist} trackTitle={trackTitle} />
          <!-- Container for "Lyttet" and LessonCounter -->
          <div style="display: flex; align-items: center; margin-top: -0.5rem;">
            <h3 class="mb-0.5 text-orange-600 text-left" style="margin-right: 0.7rem;">Lyttet:</h3>
            <!-- LessonCounter Container with Flexbox for Equal Spacing -->
            <div style="display: flex; flex: 1; justify-content: space-between;">
              <!-- Assume LessonCounter internally handles its items as flex children -->
              <LessonCounter trackIndex={trackIndex / 4} />
            </div>
          </div>
        </div>
      </section>
    </main>
  </button>
  
  
  
  


