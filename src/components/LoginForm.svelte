<script>
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';
    let usr = '';
    let audioFile;
    let showManualButton = false;

    const animal = "Torsk2";
    if (browser) {
     audioFile = new Audio("https://d3spngajmc7mtz.cloudfront.net/00+QUIZ.mp3");
    }

    function startQuiz() {
        // Attempt to play the audio
        audioFile.play().then(() => {
        // Try to open the quiz in a new tab
        const quizWindow = window.open('https://survey-xact.dk/LinkCollector?key=XJSD7KQLL6C2', '_blank');

        // Check if the new tab was blocked by the browser
        if (!quizWindow || quizWindow.closed || typeof quizWindow.closed == 'undefined') {
            console.log("Pop-up was blocked.");
            showManualButton = true;  // Show the manual button if pop-up is blocked
        }
        }).catch(error => {
        console.error('Error playing audio:', error);
        });
    }

    function handleManualQuiz() {
        window.open('https://survey-xact.dk/LinkCollector?key=XJSD7KQLL6C2', '_blank');
        showManualButton = false;
    }

    const handleSubmit = () => {
        if (browser) {
            document.cookie = `usr=${usr};max-age=31536000;path="/"`;
            };
        audioFile.pause();
        goto('/AudioTest');
    } 
</script>

<form class="my-11" on:submit|preventDefault={handleSubmit}>
  <div class="flex flex-col text-lg mb-1">
    <h3 class="font-bold mb-3 text-center text-xl text-gray-700">Velkomme til siden for musiklytning træningsprogram</h3>
    <h3 class="font-regular text-justify text-gray-700">Inden du starter træningen skal du tage en musik-quiz. Klik her for at starte med </h3>

    <!-- Start Quiz Button -->
    <button
      type="button"
      class="mt-3 mb-11 w-full shadow-sm rounded bg-orange-500 hover:bg-orange-600 text-lg text-white py-2 px-4"
      on:click={startQuiz}>
      Start Quiz
    </button>

    <!-- Conditionally render the manual button if the quiz fails to open in a new tab -->
    {#if showManualButton}
    <h3 class="font-regular mb-3 text-justify text-cr text-gray-700" >Der ser ud til at være et problem med quiz siden. Prøv at åbne quiz’en manuelt. </h3>
      <button
        type="button"
        class="mt-3 mb-11 w-full shadow-sm rounded bg-green-600 hover:bg-green-700 text-lg text-white py-2 px-4"
        on:click={handleManualQuiz}>
        Åbne quiz side
      </button>
    {/if}

    <h3 class="font-regular mb-3 text-justify text-cr text-gray-700">Når du har taget quiz’en, skal du indtaste dit telefonnummer herunder for at fortsætte til træningen</h3>
    
    <!-- Phone Number Input -->
    <input
      type="text"
      bind:value={usr}
      name="todo"
      placeholder="Skriv dit telefonnummer her"
      class="appearance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg" />

    <!-- Continue Button -->
    <button
      type="continue"
      class="mt-3 mb-11 w-full shadow-sm rounded bg-sky-500 hover:bg-sky-600 text-lg text-white py-2 px-4">
      Fortsæt
    </button>
  </div>
</form>