<script>
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';
    let usr = '';
    let audioFile;

    const animal = "Torsk2";
    if (browser) {
     audioFile = new Audio("https://d3spngajmc7mtz.cloudfront.net/Chimes.mp3");
    }

    function startQuiz() {
        audioFile.play().then(() => {
            window.open('https://survey-xact.dk/LinkCollector?key=XJSD7KQLL6C2', '_blank');
        }).catch(error => {
            console.error('Error playing audio:', error);
        });
    }

    const handleSubmit = () => {
        //addUsr(usr);
        //console.log(usr)
        //usr='';
        if (browser) {
            document.cookie = `usr=${usr};max-age=31536000;path="/"`;
            };
        goto('/AudioTest');
    } 
</script>

<form class="my-11 " on:submit|preventDefault={handleSubmit}>
    <div class="flex flex-col text-lg mb-1">
        <h3 class="font-bold mb-3 text-center text-xl text-gray-700">Velkomme til siden for musiklytning træningsprogram</h3>
        <h3 class="font-regular text-justify text-gray-700">Inden du starter træningen skal du tage en musik-quiz. Klik her for at starte med </h3>
        <button  type="button"
                 class="mt-3 mb-11 w-full shadow-sm rounded bg-orange-500 hover:bg-orange-600 text-lg text-white py-2 px-4"
                 on:click={startQuiz}>
                 Start Quiz
        </button>
        <h3 class="font-regular mb-3 text-justify text-cr text-gray-700">Når du har taget quiz’en, skal du indtaste dit telefonnummer herunder for at fortsætte til træningen</h3>
        <input type="text" bind:value={usr} name="todo" placeholder="Skriv dit telefonnummer her" 
            class="appearance-none shadow-sm border border-gray-200 p-2 
            focus:outline-none focus:border-gray-500 rounded-lg"/>
        <button type="continue" 
                class="mt-3 mb-11 w-full shadow-sm rounded bg-sky-500 hover:bg-sky-600 text-lg text-white py-2 px-4">
                Fortsæt
        </button>
    </div>
</form>