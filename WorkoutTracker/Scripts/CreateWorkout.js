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

//function createExerciseInputHtml(id) {
//    return function(elementId) {
//        return '<div class="exercise-input-weight" id="exercise-input-weight-' + id + '.' + elementId + '"><input type="text"></div><div class="exercise-input-reps" id="exercise-input-reps-' + id + '.' + elementId + '"><input type="text"></div>';
//    };
//}

//function exerciseHeaderHtml() {
//    return '<span class="exercise-input-weight">Weight</span><span class="exercise-input-reps">Reps</span>';
//}

//function htmlToRemove(selector) {
//    return [selector.children('.exercise-input-weight').last(), selector.children('.exercise-input-reps').last()];
//}

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
            //selector.children('.exercise-input-weight').last().remove();
            //selector.children('.exercise-input-reps').last().remove();
            //$.each(htmlToRemove, function(i, v) {
            //    v.remove();
            //});
            $(htmlToRemove[i*2 - 1]).remove();
            $(htmlToRemove[i*2 - 2]).remove();
        }
    }
}

function updateSetInputs(currentNumber, newNumber, selector) {
    //var htmlToAdd = '<div class="exercise-input-weight" id="exercise-input-weight-' + id + '.' + elementId + '"><input type="text"></div><div class="exercise-input-reps" id="exercise-input-reps-' + id + '.' + elementId + '"><input type="text"></div>';
    //var htmlToRemove = [selector.children('.exercise-input-weight').last(), selector.children('.exercise-input-reps').last()];
    var htmlToAppend = $('.exercise-input-weight-set-template').html();
    var htmlToRemove = selector.children("[class^='exercise-input']");
    updateSetValues(currentNumber, newNumber, selector, htmlToAppend, htmlToRemove);

    //var delta = newNumber - currentNumber;
    
    //if (delta == 0) {
    //    // do nothing
    //} else if (delta > 0) {
    //    for (var i = 0; i < delta; i++) {
    //        var elementId = i + 1;
    //        selector.append('<div class="exercise-input-weight" id="exercise-input-weight-' + id + '.' + elementId + '"><input type="text"></div><div class="exercise-input-reps" id="exercise-input-reps-' + id + '.' + elementId + '"><input type="text"></div>');
    //    }
    //} else {
    //    for (var i = 0; i < -delta; i++) {
    //        //selector.children("[class^='exercise-input']:nth-last-child(-n+2)").remove(); TODO: Update jQuery to 1.9 or greater to use this functionality
    //        selector.children('.exercise-input-weight').last().remove();
    //        selector.children('.exercise-input-reps').last().remove();
    //    }
    //}
}

function updateSetHeaders(currentNumber, newNumber, selector) {
    var htmlToAppend = $('.exercise-header-template').html();
    // Want to return an element that returns an array of Weight text, and and array of Set text
    var htmlToRemove = selector.children("[class^='exercise-input']");
    //updateSetValues(currentNumber, newNumber, selector, htmlToAppend, htmlToRemove(selector));
    updateSetValues(currentNumber, newNumber, selector, htmlToAppend, htmlToRemove);

    //var delta = newNumber - currentNumber;

    //if (delta == 0) {
    //    // do nothing
    //} else if (delta > 0) {
    //    for (var i = 0; i < delta; i++) {
    //        selector.append('<span class="exercise-input-weight">Weight</span><span class="exercise-input-reps">Reps</span>');
    //    }
    //} else {
    //    for (var i = 0; i < -delta; i++) {
    //        selector.children('.exercise-input-weight').last().remove();
    //        selector.children('.exercise-input-reps').last().remove();
    //    }
    //}
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
    //var selector = '#exercise-input-set';
    //var numberOfSets = $(selector).children('input').val() == '' ? 0 : $(selector).children('input').val();
    var numberOfSets = exerciseSetInput.value;
    //var numberOfSets = exerciseSetInput.children('input').val() == '' ? 0 : $(selector).children('input').val();
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

            //exercisesToAdd.append('<div class="exercise-input"' +
            //    '"><div class="exercise-input-name"' +
            //    '"><input type="text"></div><div class="exercise-input-sets"' +
            //    '"><input type="text" onblur="addExerciseSetInputs(this)"></div></div></div>');

            //exercisesToAdd.append('<div class="exercise-input" id="exercise-input-' + elementId +
            //    '"><div class="exercise-input-name" id="exercise-input-name-' + elementId +
            //    '"><input type="text"></div><div class="exercise-input-sets" id="exercise-input-set-' + elementId +
            //    '"><input type="text" onblur="addExerciseSetInputs(this)"></div></div></div>');
        }
    } else {
        for (var i = currentNum; i > newNum; i--) {
            //exerciseInputs.eq(i - 1).remove();
            //exerciseInputs.get(i - 1).remove();
            $(exerciseInputs[i - 1]).remove();
            //exerciseInputs.last().remove();
            //exerciseInputs.pop().remove();
            //exercisesToAdd.children('.exercise-input').last().remove();
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