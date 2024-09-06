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
        <h3 class="font-bold mb-3 text-center text-xl text-gray-700">Stor tillykke</h3>
        <h3 class="font-regular text-justify text-gray-700">You finished the training program FANTASTIC. Now you need to take the test again to tell us how it went </h3>
        <button  type="button"
                 class="mt-3 mb-11 w-full shadow-sm rounded bg-orange-500 hover:bg-orange-600 text-lg text-white py-2 px-4"
                 on:click={startQuiz}>
                 Start Quiz
        </button>
</main>