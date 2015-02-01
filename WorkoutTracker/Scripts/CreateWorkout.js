function getMaxSetsForAllExercises() {
    var allExerciseSetInputs = $('.exercise-input').children('.exercise-input-sets');
    var maxSets = 0;

    $.each(allExerciseSetInputs,function () {
        var setsForExercise = $(this).children().first().val() == '' ? 0 : $(this).children().first().val();
        
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
    var htmlToRemove = selector.children("[class^='exercise-input']");
    updateSetValues(currentNumber, newNumber, selector, htmlToAppend, htmlToRemove);
}

function updateSetHeaders(currentNumber, newNumber, selector) {
    var htmlToAppend = $('.exercise-header-template').html();
    // Want to return an element that returns an array of Weight text, and and array of Set text
    var htmlToRemove = selector.children("[class^='exercise-input']");
    //updateSetValues(currentNumber, newNumber, selector, htmlToAppend, htmlToRemove(selector));
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

function hookUpEvents() {
    $('.add-exercise-button').click(function () {
        $('.add-exercises').removeClass('hidden');
    });
}

function main() {
    hookUpEvents();
}

$(document).ready(main);