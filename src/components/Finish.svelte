<script>
    import { browser } from '$app/environment';

    let audioFile;
    
    if (browser) {
     audioFile = new Audio("https://d3spngajmc7mtz.cloudfront.net/25+QUIZ.mp3");
    }

    function startQuiz() {
        audioFile.play().then(() => {
            window.open('https://www.survey-xact.dk/LinkCollector?key=JU357WYRJJ9J', '_blank');
        }).catch(error => {
            console.error('Error playing audio:', error);
        });
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
</main>