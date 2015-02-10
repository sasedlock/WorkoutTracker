﻿function getMaxSetsForAllExercises() {
    var allExerciseSetInputs = $('.exercise-input').children('.exercise-input-sets');
    var maxSets = 0;

    $.each(allExerciseSetInputs,function () {
        var setsForExercise = $(this).children().first().val();
        if (setsForExercise === '') {
            setsForExercise = 0;
        }
        
        if (setsForExercise > maxSets) {
            maxSets = setsForExercise;
        }
    });

    return maxSets;
}

function updateSetValues(currentNumber, newNumber, selector, htmlToAdd, htmlToRemove) {
    var delta = newNumber - currentNumber;

    if (delta == 0) {
        // do nothing
    } else if (delta > 0) {
        for (var i = 0; i < delta; i++) {
            selector.append(htmlToAdd);
        }
    } else {
        for (var i = currentNumber; i > newNumber; i--) {
            //selector.children("[class^='exercise-input']:nth-last-child(-n+2)").remove(); TODO: Update jQuery to 1.9 or greater to use this functionality
            $(htmlToRemove[i*2 - 1]).remove();
            $(htmlToRemove[i*2 - 2]).remove();
        }
    }
}

function updateSetInputs(currentNumber, newNumber, selector) {
    var htmlToAppend = $('.exercise-input-weight-set-template').html();
    var htmlToRemove = selector.children('.exercise-input-weight, .exercise-input-reps');
    updateSetValues(currentNumber, newNumber, selector, htmlToAppend, htmlToRemove);
}

function updateSetHeaders(currentNumber, newNumber, selector) {
    var htmlToAppend = $('.exercise-header-template').html();
    var htmlToRemove = selector.children("[class^='exercise-input']");
    updateSetValues(currentNumber, newNumber, selector, htmlToAppend, htmlToRemove);
}

function addAppropriateNumberOfSetInputs(numberOfSets, exerciseSetInput) {
    var exerciseInput = $(exerciseSetInput).parent().parent();
    var exerciseHeader = $('.exercise-header');

    var currentWeightSetInputNumber = exerciseInput.children('.exercise-input-weight').length;
    var currentMaxSetInputNumber = exerciseHeader.children('.exercise-input-weight').length;

    var maxSetsForAllExercises = getMaxSetsForAllExercises();

    updateSetInputs(currentWeightSetInputNumber, numberOfSets, exerciseInput);
    updateSetHeaders(currentMaxSetInputNumber, maxSetsForAllExercises, exerciseHeader);
}

function addExerciseSetInputs(exerciseSetInput) {
    var numberOfSets = exerciseSetInput.value;
    if (numberOfSets === '') {
        numberOfSets = 0;
    }
    addAppropriateNumberOfSetInputs(numberOfSets, exerciseSetInput);
}

function addAppropriateNumberOfExerciseInputs(newNum) { // TODO: Incorporate into helper functions above
    var exercisesToAdd = $('.exercises-to-add');
    var exerciseInputs = exercisesToAdd.children('.exercise-input');

    var currentNum = exerciseInputs.length;
    var delta = newNum - currentNum;

    var htmlToAppend = $('.exercise-input-template').html();

    if (delta == 0) {
        // do nothing
    } else if (delta > 0) {
        for (var i = 0; i < delta; i++) {
            exercisesToAdd.append(htmlToAppend);
        }
    } else {
        for (var i = currentNum; i > newNum; i--) {
            $(exerciseInputs[i - 1]).remove();
        }
    }
}

function addExerciseInputs() {
    var numberOfExercises = $('#selectNumberOfExercises').val();
    addAppropriateNumberOfExerciseInputs(numberOfExercises);
}

function getExerciseInputs() {
    $('.exercises-to-add').children('.exercise-input').each(function (exerciseIndex) {
        var exerciseInput = $(this);
        var exerciseName = exerciseInput.find("[class*='name']>input").val();
        var sets = new Array();

        exerciseInput.children('.exercise-input-weight').each(function (setIndex) {
            var weight = $(this).find('input').val();
            var reps = $(this).next().find('input').val();
            //sets.push({ Id: setIndex + 1, Weight: weight, Repetitions: reps });
            sets.push({ Weight: weight, Repetitions: reps });
        });

        //exercises.push({ Id: exerciseIndex + 1, Name: exerciseName, Sets: sets });
        exercises.push({ Name: exerciseName, Sets: sets });
    });

    return exercises;
}

function fillWorkout() {
    //workout.Id = 1;
    workout.Date = $('#Date').val();
    workout.Exercises = getExerciseInputs();
}

function hookUpEvents() {
    $('.add-exercise-button').click(function () {
        $('.add-exercises').removeClass('hidden');
    });
    
    /*
    // Hook up click event to create workout button to an event that will
    - Collect data all data related to a workout
    - Pass a Workout model back to the proper URL via an AJAX call
    */
    $('#CreateWorkout').click(function() {
        fillWorkout();
        var url = "/Workout/Create";
        console.log(workout);

        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify({ workout: workout }),
            contentType: 'application/json',
            success: function() {
                alert('success!');
            },
            error: function(jqXHR, testStatus, errorThrown) {
                console.log("jqXHR: " + jqXHR);
                console.log("testStatus: " + testStatus);
                console.log("errorThrown: " + errorThrown);
            },
            dataType: "json"
        });
    });
}

function main() {
    hookUpEvents();
}

var workout = new Object();
var exercises = new Array();


$(document).ready(main);
