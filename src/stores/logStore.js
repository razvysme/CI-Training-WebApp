import { writable } from 'svelte/store';
import {supabase} from '../supabase.js';
import { browser } from '$app/environment';

let usr;
let id;
let newID;

if(browser) {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    usr = getCookie('usr');
    //console.log(usr);
}
  
export const logVisit = async (Animal=usr) => {
    //console.log("Visited");
    const{data, error} = await supabase.from("TrainingLog").insert([{Animal}]);
    if(error) {
        //console.log("erroring");
        return console.error(error);
    }
}

export const logSession = async (Track, Lesson, S_Length = 0) => {
    //console.log("Session Started");
    let Animal = usr;
    let Completed = false;
    const{data, error} = await supabase.from("TrainingLog").insert([{Animal, Track, Lesson, S_Length, Completed}]).select();
    id = data[0].id;
    //console.log("id is " + id);
    newID = id;
    //console.log("newID is " + newID);
    if(error) {
        //console.log("erroring");
        return console.error(error);
    }
    //return id;
}

export const logUpdateSession = async (S_Length, id = newID) => {
   //console.log("Updating Session with: " + S_Length + " and id: " + id);
    const{data, error} = await supabase.from("TrainingLog").update({S_Length}).match({id});
    if(error) {
        //console.log("erroring in update");
        return console.error(error);
    }
}

export const logCompleted = async (Completed = true) => {
    //console.log("Lection Completed");
    const{data, error} = await supabase.from("TrainingLog").update({Completed}).match({id});
    if(error) {
        //console.log("erroring in Completed");
        return console.error(error);
    }
}

export const logAnswers = async (user, trackNr, lessonNr, questionNr, answer) => {
    // Insert a new record into the "AnswersLog" table
    const { data, error } = await supabase.from("TrainingLog").insert([
        {
            Animal: user,
            Track: trackNr,
            Lesson: lessonNr,
            Question: questionNr,
            Answer: answer
        }
    ]);
    console.log("loggin to suppaBase: " + user + Track + Lesson + Question, + answer);
    if (error) {
        console.error("Error inserting answers: ", error);
        return error;
    } else {
        console.log("Answers logged successfully: ", data);
        return data;
    }
};