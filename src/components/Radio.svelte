<script>
    // based on suggestions from:
    // Sami Keijonen https://webdesign.tutsplus.com/tutorials/how-to-make-custom-accessible-checkboxes-and-radio-buttons--cms-32074
    // and Inclusive Components by Heydon Pickering https://inclusive-components.design/toggle-button/
  
    export let options;
    export let legend;
    export let userSelected = options[0].value;
    export let fontSize = 16;
    export let flexDirection = 'column';
    export let correctAnswer = ''; 
    export let showAnswers = false;
      
    const uniqueGroupID = Math.random().toString(36).substring(2, 15);
  
    const slugify = (str = "") =>
      str.toLowerCase().replace(/ /g, "-").replace(/\./g, "");
  </script>
  
  <div role="radiogroup" 
     class="group-container"
     aria-labelledby={`label-${uniqueGroupID}`}
     style="font-size:{fontSize}px; flex-direction:{flexDirection}" 
     id={`group-${uniqueGroupID}`}>
  <div class="legend" id={`label-${uniqueGroupID}`}>{legend}</div>
  
  {#each options as { value, label }}
    <input
      class="sr-only"
      type="radio"
      id={slugify(label) + uniqueGroupID}  
      name={uniqueGroupID}
      bind:group={userSelected}
      value={value} />
    <label for={slugify(label) + uniqueGroupID} class={showAnswers && label === correctAnswer ? 'highlight-green' : ''}>
      {label}
    </label>
  {/each}
</div>
  
  <style>
              :root {
          --accent-color: CornflowerBlue;
          --gray: #ccc;
      }
      
     .group-container {
        border-radius: 2px;
        display: flex;
        flex-direction: row;
      }
  
    .legend {
      font-weight: bold;
    }
    label {
      user-select: none;
      line-height: 1.2em;
    }
  
    .sr-only {
      position: absolute;
      clip: rect(1px, 1px, 1px, 1px);
      padding: 0;
      border: 0;
      height: 1px;
      width: 1px;
      overflow: hidden;
    }
  
    input[type="radio"] {
      position: absolute;
    }
  
    input[type="radio"] + label {
      display: block;
      position: relative;
      text-align: left;
    }
  
    input[type="radio"] + label::before {
        content: "";
        position: relative;
        display: inline-block;
        margin-right: 0.5em;
        width: 1em;
        height: 1em;
        background: transparent;
        border: 1px solid var(--gray, #ccc);
        border-radius: 50%;
        top: 0.2em;
    }
  
    input[type="radio"]:checked + label::before {
      border: 1px solid var(--gray, #ccc);
      border-radius: 50%;
    }
  
    input[type="radio"] + label::after {
      content: "";
      position: absolute;
      display: inline-block;
      width: 0.5em;
      height: 0.5em;
      top: 0.45em;
      left: 0.25em;
      background: var(--accent-color, #282828);
      border: 1px solid var(--accent-color, #282828);
      border-radius: 50%;
      transform: scale(0);
    }
  
    input[type="radio"]:checked + label::after {
      opacity: 1;
      transform: scale(1);
    }
  
    input[type="radio"]:focus + label::before {
      box-shadow: 0 0 0 1px var(--accent-color, #282828);
      border-radius: 50%;
    }  
    
    input[type="radio"]:disabled + label {
      color: darken(var(--gray, #ccc), 10);
    }
  
    input[type="radio"]:disabled + label::before {
      background: var(--gray, #ccc);
    } 
    /* gravy */
  
  
    input[type="radio"] + label::before {
        transition: background 0.3s ease-out;
    }
  
    input[type="radio"]:checked + label::before {
      transition: background 0.3s ease-in;
    }
  
    input[type="radio"] + label::after {
      transition: transform 0.2s ease-out;
    }
  
    input[type="radio"]:checked + label::after {
      transition: transform 0.2s ease-in;
    }
  
    input[type="radio"]:focus + label::before {
      box-shadow: 0 0px 8px var(--accent-color, #282828);
      border-radius: 50%;
    }

    .highlight-green {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(40, 154, 20, 0.3); 
      border-radius: 0.4em; 
      z-index: 1; 
  }
  
  </style>
  