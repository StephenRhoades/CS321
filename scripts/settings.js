/** Handles extension settings and user preferences.
 * 
 * @author Evan Bellino.
 * @since 5.4.0
 */

/**
 * Changes default visual theme.
 * 
 * @param {String} theme Specifies theme to be set.
 */
function setTheme(theme){

}

/**
 * Changes default window background color.
 * 
 * @param {String} color Specifies background color to be set.
 */
function setBackgroundColor(color){

}

/**
 * Changes default font size/scaling.
 * 
 * @param {String} size Specifies font size to be set.
 */
function setFontSize(size){

}

/**
 * Changes default font color.
 * 
 * @param {String} color Specifies font size to be set.
 */
function setFontColor(color){

}

/**
 * Changes default window size/scaling.
 * 
 * @param {Number} height Specifies window height to be set.
 * @param {Number} width  Specifies window width to be set.
 */
function setWindow(height, width){

}

/**
 * Changes default window height size/scaling.
 * 
 * @param {Number} height Specifies window height to be set.
 */
function setWindowHeight(height){

}

/**
 * Changes default window width size/scaling.
 * 
 * @param {Number} width Specifies window size to be set.
 */
function setWindowWidth(width){

}

/**
 * Toggles default task input form between comprehensive and quick input schemes.
 */
function toggleQuickAdd(){

}

/**
 * Sets a default date to autofill a new tasks date field.
 * 
 * Does not handle defaults (ie: calculating current date) in function,
 * any date calculations should be done before calling.
 * Will likley be used to set current year/month as day is less useful.
 * 
 * @param {Number} month Defines desired autofill month.
 * @param {Number} day   Defines desired autofill day.
 * @param {Number} year  Defines desired autofill year.
 */
function setDatePreset(month, day, year){

}

/**
 * Removes any preset autofill for new task date field.
 */
function removeDatePreset(){

}



/************************************************************
 *                                                          *
 * Below are some QOL additions but not necessary me thinks.*
 * Or i'm not sure how hard they'd be to implement.         *
 *                                                          *
 ***********************************************************/



/**
 * Sets a default time to autofill a new tasks time field.
 * 
 * @param {Number} hour   Defines desired autofill hour.
 * @param {Number} minute Defines desired autofill minute.
 * @param {String} tod    Defines desired autofill (AM/PM).
 */
function setTimePreset(hour, minute, tod){

}

/**
 * Removes any preset autofill for new task time field.
 */
function removeTimePreset(){

}

/**
 * Adds a new custome option for a task to be repeated.
 * 
 * @param {*} rep Describes repetition increment to be added.
 */
function addRepeater(rep){

}

/**
 * Removes an option for a task repetition.
 * 
 * @param {*} rep Describes repetition option to be removed.
 */
function removeRepeater(rep){

}

/**
 * Adds a new custome option for a task reminder.
 * 
 * @param {*} rem Describes reminder timeframe to be added.
 */
function addReminder(rem){

}

/**
 * Removes an option for a task reminder.
 * 
 * @param {*} rem Describes reminder timeframe to be removed.
 */
function removeReminder(rem){

}