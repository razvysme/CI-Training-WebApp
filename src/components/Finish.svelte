<script>
    import { browser } from '$app/environment';

    let audioFile;
    let showManualButton = false;
    
    if (browser) {
     audioFile = new Audio("https://d3spngajmc7mtz.cloudfront.net/25+QUIZ.mp3");
    }
    function startQuiz() {
        // Attempt to play the audio
        audioFile.play().then(() => {
        // Try to open the quiz in a new tab
        const quizWindow = window.open('https://www.survey-xact.dk/LinkCollector?key=JU357WYRJJ9J', '_blank');

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
        window.open('https://www.survey-xact.dk/LinkCollector?key=JU357WYRJJ9J', '_blank');
        showManualButton = false;
    }
</script>

<main>  
    <div class="flex flex-col text-lg mb-1">
        <h3 class="font-bold mb-3 text-center text-3xl text-gray-700">TILLYKKE!</h3>
        <h3 class="text-2xl text-justify text-gray-700">
                    Du er nu færdig med hele træningsprogrammet.</h3>
        <h3 class="mt-3 text-xl text-justify text-gray-700">
                    Nu er det tid til at tage den quiz, som afslutter hele forløbet.</h3>
        <button  type="button"
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
    </div>
</main>