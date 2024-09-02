<script>
    let usr = '';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import {logVisit} from "../stores/logStore.js";

    const animal = "Torsk2";
    let audioFile;

    if (browser) {
     audioFile = new Audio("https://raw.githubusercontent.com/razvysme/CI-Training-WebApp/main/src/lib/audio/Chimes.mp3");
      //const audioFile = new Audio("src/lib/audio/Chimes.mp3");
    }

    function playTestAudio() 
    {
        //console.log('Playing test audio...');
        audioFile.play();
    }

    onMount(() => {
      playTestAudio(); // Call the function when the component is mounted
      console.log("Mounting test audio...");
    });

    const handleSubmit = () => {
        //addUsr(usr);
        //console.log(usr)
        //usr='';
        goto('/Selection');
    };

    
</script>

<style>
    .text-cr {
      /* Custom text size */
      font-size: 1.3rem; /* Adjust the size value as needed */
    }
  </style>

<form class="my-11 " on:submit|preventDefault={handleSubmit}>
    <div class="flex flex-col text-lg">
        <h3 class="font-bold mb-3 text-left text-cr text-gray-700">Lad os sikre os at lyden virker ved at trykke på <span class="text-gray-1000">Test Lyden</span></h3>
        <h1 class="mb-4 text-gray-500 text-xl text-center">Hørte du en lyd?</h1>
        <h1 class="mb-2 text-gray-500 text-base text-left">Hvis ikke, så følg disse trin for at få lyden til at fungere:</h1>
    </div>
    
    <div class="flex justify-between space-x-2">
        <button
          type="button"
          class="my-11 flex-1/2 sm:flex-1/3 md:flex-1/2 lg:flex-1/2 xl:flex-1/2 shadow-sm rounded bg-sky-500 hover:bg-sky-600 text-lg text-white py-2 px-4"
          on:click={playTestAudio}
        >
          Test Lyden
        </button>
      
        <button
          type="continue"
          class="my-11 flex-1 shadow-sm rounded bg-orange-500 hover:bg-orange-600  text-lg text-white py-2 px-4"
          on:click={logVisit()}
          >
          Fortsæt
        </button>
      </div>
</form>