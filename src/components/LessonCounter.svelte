<script>
    import Circle from './Circle.svelte';
    import { listenMatrix } from "./../stores/trackIndexStore.js";
    
    let completedColor = '#DD6B20';
    let incompletedColor = '#C4C4C4';

    export let trackIndex = 1;
    let rowData = listenMatrix[trackIndex];

    function getColor(value) {
        return value === 1 ? completedColor : incompletedColor;
    }
</script>

<main style="display: grid; grid-template-columns: repeat(4, 1fr); grid-gap: 1rem; width: 100%;">
    {#each rowData as value}
        <Circle color={getColor(value)} />
    {/each}
</main>
