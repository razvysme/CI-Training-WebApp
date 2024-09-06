<script>
    let usr = '';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import {logVisit} from "../stores/logStore.js";
    import Logos from "./Logos.svelte"

    const animal = "Torsk2";
    let audioFile;

    if (browser) {
     audioFile = new Audio("https://d3spngajmc7mtz.cloudfront.net/Chimes.mp3");
    }

    function playTestAudio() 
    {
        audioFile.play();
    }

    onMount(() => {
      playTestAudio(); 
      console.log("Mounting test audio...");
    });

    const handleSubmit = () => {
        goto('/Selection');
    };
</script>

<form class="my-11 " on:submit|preventDefault={handleSubmit}>
    <div class="flex flex-col text-lg">
        <h3 class="font-bold mb-2 text-center text-2xl text-gray-700">Lydtest</h3>
        
        <h1 class="mb-4 text-gray-700 text-lg text-justify"> Du er velkommen til at lytte til træningen som du vil – på din computer, telefon eller tablet – og ved at streame eller gennem den indbyggede højtaler. Inden du går videre, har du her muligheden for at tjekke at lyden virker.</h1>
        <h1 class="mb-2 text-gray-500 text-base text-left">Hvis ikke, så følg disse trin for at få lyden til at fungere:</h1>
        
        <ul class="list-disc list-inside ml-4 text-sm text-gray-500">
          <li>Tjek at dine højttalere eller høretelefoner er tilsluttet korrekt.</li>
          <li>Hvis du bruger en Cochlearimplant, skal du sørge for, at streaming er slået til.</li>
          <li>Sørg for, at lydstyrken er skruet op på din enhed.</li>
          <li>Prøv at genstarte din enhed og forsøg igen.</li>
        </ul>
      </div>
    <div class="flex justify-between space-x-2">
        <button
          type="button"
          class="my-11 flex-1/2 sm:flex-1/3 md:flex-1/2 lg:flex-1/2 xl:flex-1/2 shadow-sm rounded bg-sky-500 hover:bg-sky-600 text-lg text-white py-2 px-4"
          on:click={playTestAudio}>
          Test Lyden
        </button>
      
        <button
          type="continue"
          class="my-11 flex-1 shadow-sm rounded bg-orange-500 hover:bg-orange-600  text-lg text-white py-2 px-4"
          on:click={logVisit()}>
          Fortsæt
        </button>
      </div>
      <div class="mt-0">
        <Logos />
    </div>

</form>