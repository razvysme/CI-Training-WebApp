<script>
	import { audioData} from '../audioData.js';
	import { goto } from '$app/navigation';
	import TrackHeading from './TrackHeading.svelte';
	import ProgressBarTime from './ProgressBarTime.svelte';
	import Controls from './Controls.svelte';
	import PlayList from './PlayList.svelte';
	import {listenMatrix} from './../stores/trackIndexStore.js';
	import { browser } from '$app/environment';
	import { logSession } from '../stores/logStore.js';
	import { logUpdateSession } from '../stores/logStore.js';
	import { logCompleted } from '../stores/logStore.js';
	import { logAnswers } from '../stores/logStore.js';
	import {tactileUsers } from "../stores/userList.js"
	import Radio from './Radio.svelte'

	// Get Audio track
	export let  trackIndex = 1;
	let audioFile;
	let trackTitle;
	let trackArtist;
	let coverArt;
	let audioDB;
	let listened = false;
	let usr;
	let q1;
	let q2;
	let a1;
	let a2;
	let radioOpt1;
	let radioOpt2;
	let showAnswers = false;
	let correctAnswer1;
	let correctAnswer2;

	let totalTimeDisplay = "loading...";
	let currTimeDisplay = "0:00:00";
	let progress = 0;
	let trackTimer;

	if(browser) 
	{
		function getCookie(name) {
			const value = `; ${document.cookie}`;
			const parts = value.split(`; ${name}=`);
			if (parts.length === 2) return parts.pop().split(';').shift();
		}
		usr = getCookie('usr');
		audioDB = audioData;
		/* #This bit selects different tracks for tactile and non tactile
		if (tactileUsers.includes(usr)) {
			audioDB = audioData;
			console.log("Playin song for the tactile group");
		} else {
			audioDB = audioData_Normal;
			console.log("Playing for the normal group");
		}
		*/

		console.log("Track Index is: "+ trackIndex);
		audioFile = new Audio(audioDB[trackIndex].url);
		trackTitle = audioDB[trackIndex].name;
		trackArtist = audioDB[trackIndex].artist;
		coverArt = audioDB[trackIndex].cover;
	}

	const loadTrack = () => {
		console.log(trackIndex);
		
		if (browser) {
			audioFile = new Audio(audioDB[trackIndex].url);
			audioFile.onloadedmetadata = () => {
				totalTrackTime = audioFile.duration;
				updateTime();
			}	
		}
		trackTitle = audioDB[trackIndex].name;
	}
	
	const autoPlayNextTrack = () => {
		if (trackIndex <= audioDB.length-1) {
			trackIndex += 1;
			loadTrack();
			audioFile.play();
		} else {
			trackIndex = 0;
			loadTrack();
			audioFile.play();
		}
	}
	
	// Track Duration and Progress Bar
	let totalTrackTime;
	//$: console.log(totalTrackTime)
	if (browser){
		audioFile.onloadedmetadata = () => {
			totalTrackTime = audioFile.duration;
			updateTime();
		}
	}
	
	function updateTime() {
		progress = audioFile.currentTime * (100 / totalTrackTime);
		
		let currHrs = Math.floor((audioFile.currentTime / 60) / 60);
		let currMins = Math.floor(audioFile.currentTime / 60);
		let currSecs = Math.floor(audioFile.currentTime - currMins * 60);
		
		let durHrs = Math.floor( (totalTrackTime / 60) / 60 );
		let durMins = Math.floor( (totalTrackTime / 60) % 60 );
		let durSecs =  Math.floor(totalTrackTime - (durHrs*60*60) - (durMins * 60));
		
		if(currSecs < 10) currSecs = `0${currSecs}`;
		if(durSecs < 10) durSecs = `0${durSecs}`;
		if(currMins < 10) currMins = `0${currMins}`;
		if(durMins < 10) durMins = `0${durMins}`;
		
		currTimeDisplay = `${currHrs}:${currMins}:${currSecs}`;
		totalTimeDisplay = `${durHrs}:${durMins}:${durSecs}`;
		
		if (audioFile.ended) {
			toggleTimeRunning();
		}
	}
	
	const toggleTimeRunning = () => {
		if (audioFile.ended) {
			isPlaying = false;
			clearInterval(trackTimer);
			//console.log(`Ended = ${audioFile.ended}`);	
		} else {
			trackTimer = setInterval(updateTime, 100);
		}
	}
	
	// Controls
	let isPlaying = false;
	//$: console.log(`isPlaying = ${isPlaying}`)
	
	const playPauseAudio = () => {
		if (audioFile.paused) {
			toggleTimeRunning()
			audioFile.play();
			isPlaying = true;
			checkAudioProgress();
		} else {
			toggleTimeRunning()
			audioFile.pause();
			isPlaying = false;
		}	 	
	}
	
	const rewindAudio = () => audioFile.currentTime -= 10;
	const forwardAudio = () => audioFile.currentTime += 10;
	
	// Volume Slider
	let vol = 50;
	const adjustVol = () => audioFile.volume = vol / 100; 
	
	// Playlist
	const staticTrackIndex = trackIndex;
	let lessonIndex = 0;

	const handleTrack = (e) => {
		if (!isPlaying) {
			lessonIndex = Number(e.target.dataset.trackId);
			trackIndex = lessonIndex + staticTrackIndex;
			loadTrack();
			playPauseAudio(); // auto play
		} else {
			isPlaying = false;
			audioFile.pause();
			lessonIndex = Number(e.target.dataset.trackId);
			trackIndex = lessonIndex + staticTrackIndex;
			loadTrack();
			playPauseAudio(); // auto play
		}
	}

	function goBack()
	{
		audioFile.pause();
		goto("/Selection");
	}

	function isTestCompleted(listenMatrix) {
    // Get the last row and the last column element
    const lastRow = listenMatrix[listenMatrix.length - 1];
    const lastElement = lastRow[lastRow.length - 1];

	if (trackNr == 5 && lessonIndex == 3)
    	return lastElement === 1;
	else
		return false;
	}


	function submit(answer_1, answer_2) {
		listenMatrix[trackNr][lessonIndex] = 1;
		const listenMatrixString = JSON.stringify(listenMatrix);

		if (browser) {
			document.cookie = `listenLog=${encodeURIComponent(listenMatrixString)}; max-age=31536000; path="/"`;
		}

		logAnswers(usr, trackNr, lessonIndex, "0", answer_1);
		logAnswers(usr, trackNr, lessonIndex, "1", answer_2);
		audioFile.pause();
		
		if (!isTestCompleted(listenMatrix)) {
			console.log(isTestCompleted(listenMatrix));
			showAnswers = true;
		} else {
			goto("/Finish");
		}
	}

	function getTrackNumber(number) {
		if (number >= 0 && number <= 3) {
			return 0;
		} else if (number >= 4 && number <= 7) {
			return 1;
		} else if (number >= 8 && number <= 11) {
			return 2;
		} else if (number >= 12 && number <= 15) {
			return 3;
		} else if (number >= 16 && number <= 18) {
			return 4;
		} else if (number >= 19 && number <= 23) {
			return 5;
		} else {
			return -1;
		}
	}
	
	let trackNr = getTrackNumber(trackIndex);
	console.log("trackNr: " + trackNr);
	let checkProgressInterval;
	let logged = false;
	async function checkAudioProgress() 
	{
		clearInterval(checkProgressInterval); // Clear any existing intervals
		q1 = audioDB[trackIndex].q1;
		q2 = audioDB[trackIndex].q2;

		a1 = audioDB[trackIndex].a1.map((answer, index) => ({
			value: (index).toString(), label: answer}));

		a2 = audioDB[trackIndex].a2.map((answer, index) => ({
			value: (index).toString(), label: answer}));
		
		correctAnswer1 = audioDB[trackIndex].c1;
		correctAnswer2 = audioDB[trackIndex].c2;

		radioOpt1 = a1[0].value;
		radioOpt2 = a2[0].value;

		checkProgressInterval = setInterval(async () => 
		{
				// Check if audioFile is playing
			if (!audioFile.paused) {
				const currentTime = audioFile.currentTime;
				const totalDuration = audioFile.duration;
				if (logged){
					logUpdateSession(currentTime);
				}

				if(!logged){
					logSession(trackNr, lessonIndex, 0);
					logged = true;
				}
				
			// Check if audio has played over 98% of its length
				if ((currentTime / totalDuration) > 0.99) {
					console.log("Audio has passed 99% of its length!" + trackNr + " " + lessonIndex);
					logCompleted(true);
					listened = true;
					clearInterval(checkProgressInterval); // Stop checking progress until a sound starts again
				}
			}
		}, 5000); // Check every 5 seconds
	}
</script>

<style>
    .custom-padding {
        padding-top: 4px;
        padding-bottom: 4px;
    }
</style>

<main>
	<section id="player-cont">
	  {#if showAnswers}
		<!-- State 3: Answer Shown (questions with answers visible) -->
		<div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
		  <!-- Title for clarity -->
		  <p style="font-size: 1.5rem; margin-bottom: 1rem;">Korrekte svar</p>
  
		  <!-- First Radio Group with answers shown -->
		  <div style="width: 100%; margin-bottom: 1rem;">
			<Radio
			  options={a1}
			  fontSize={16}
			  legend={q1}
			  correctAnswer={correctAnswer1}
			  showAnswers={true}
			  bind:userSelected={radioOpt1}
			/>
		  </div>
		  <p style="margin-top: 0.5rem;"></p>
  
		  <!-- Second Radio Group with answers shown -->
		  <div style="width: 100%; margin-bottom: 1rem;">
			<Radio
			  options={a2}
			  fontSize={16}
			  legend={q2}
			  correctAnswer={correctAnswer2}
			  showAnswers={true}
			  bind:userSelected={radioOpt2}
			/>
		  </div>
		  <p style="margin-top: 0.5rem;"></p>
		</div>
	  {:else if !listened}
		<!-- State 1: Playing (media controls, playlist, and song cover) -->
		<div style="display: flex; justify-content: center; align-items: center;">
		  <img src={coverArt} alt="Cover Art" style="width: 75%; height: 75%; border-radius: 8px;" />
		</div>
		<TrackHeading artist={trackArtist} trackTitle={trackTitle} />
		<Controls {isPlaying}
				  on:rewind={rewindAudio}
				  on:playPause={playPauseAudio}
				  on:forward={forwardAudio} />
		<ProgressBarTime {currTimeDisplay}
						 {totalTimeDisplay}
						 {progress} />
	  {:else if listenMatrix[trackNr][lessonIndex] == 0}
		<!-- State 2: Questions (radio buttons, Tilbage button, and Submit button) -->
		<div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
		  <!-- Title for clarity -->
		  <p style="font-size: 1.5rem; margin-bottom: 1rem;">Question Time!</p>
  
		  <!-- First Radio Group -->
		  <div style="width: 100%; margin-bottom: 1rem;">
			<Radio
			  options={a1}
			  fontSize={16}
			  legend={q1}
			  correctAnswer={correctAnswer1}
			  showAnswers={false}
			  bind:userSelected={radioOpt1}
			/>
		  </div>
		  <p style="margin-top: 0.5rem;"></p>
  
		  <!-- Second Radio Group -->
		  <div style="width: 100%; margin-bottom: 1rem;">
			<Radio
			  options={a2}
			  fontSize={16}
			  legend={q2}
			  correctAnswer={correctAnswer2}
			  showAnswers={false}
			  bind:userSelected={radioOpt2}
			/>
		  </div>
		  <p style="margin-top: 0.5rem;"></p>
		</div>
	  {:else}
		<!-- State 4: Display cover art and controls again if the question has been answered -->
		<div style="display: flex; justify-content: center; align-items: center;">
		  <img src={coverArt} alt="Cover Art" style="width: 75%; height: 75%; border-radius: 8px;" />
		</div>
		<TrackHeading artist={trackArtist} trackTitle={trackTitle} />
		<Controls {isPlaying}
				  on:rewind={rewindAudio}
				  on:playPause={playPauseAudio}
				  on:forward={forwardAudio} />
		<ProgressBarTime {currTimeDisplay}
						 {totalTimeDisplay}
						 {progress} />
	  {/if}
	</section>
  
	<div class="flex justify-between items-start self-start space-x-2">
	  {#if showAnswers}
		<!-- Show only 'Tilbage' button when showAnswers is true -->
		<button
		  type="button"
		  class="w-full shadow-sm rounded bg-sky-500 hover:bg-sky-600 text-lg text-white py-1 px-4 custom-padding"
		  on:click={goBack}
		>
		  Tilbage
		</button>
	  {:else}
		<!-- Show both buttons or dynamic content when showAnswers is false -->
		<button
		  type="button"
		  class="shadow-sm rounded bg-sky-500 hover:bg-sky-600 text-lg text-white py-1 px-4 custom-padding"
		  on:click={goBack}
		>
		  Tilbage
		</button>
		{#if listened && listenMatrix[trackNr][lessonIndex] == 0}
		  <!-- Submit button shown if listened is true and in the question state -->
		  <button
			type="button"
			class="flex-1 shadow-sm rounded bg-orange-500 hover:bg-orange-600 text-lg text-white py-1 px-4 custom-padding"
			on:click={() => submit(radioOpt1, radioOpt2)}
		  >
			Submit
		  </button>
		{:else}
		  <!-- Playlist component shown if not in the question state -->
		  <div class="flex-1">
			<PlayList song={trackIndex} on:click={handleTrack} />
		  </div>
		{/if}
	  {/if}
	</div>
  </main>
  
  
  


