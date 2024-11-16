/** Handles extension settings and user preferences.
 * 
 * @author Evan Bellino.
 * @since 5.4.0
 */

var windowTheme = 'light';
var backgroundColor = 'FFFFFF';
var fontColor = '000000';
var fontSize = 12;
var windowWidth;
var windowHeight;
var quickAddEnabled = false; 

/**
 * Ensures only valid input lengths for function parameters.
 * 
 * @param {*} object 
 */
function maxLengthCheck(object) {
    if (object.value.length > object.max.length)
      object.value = object.value.slice(0, object.max.length)
}

/**
 * Ensures only valid input types for respective function parameters.
 * 
 * @param {*} evt 
 */
function isNumeric (evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode (key);
    var regex = /[0-9]|\./;
    if ( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
}

/**
 * Changes default visual theme.
 * Accepts input of 'light' or 'dark', or enables custom inputs.
 * 
 * @param {String} theme Specifies theme to be set.
 */
function setTheme(theme){
    if(theme === 'light'){
        windowTheme = 'light';
        setBackgroundColor('FFFFFF');
        setFontColor('000000');
    }
    else if(theme === 'dark'){
        windowTheme = 'dark';
        setBackgroundColor('1E1E1E');
        setFontColor('A5A5A5');
    }
    else{
        windowTheme = 'custom';
    }
}

/**
 * Changes default window background color according to 
 * 6 digit hex representation.
 * 
 * @param {String} color Specifies background color to be set.
 */
function setBackgroundColor(color){
    hexNumber = parseInt(color, 16);
    if(hexNumber >= 0x000000 && hexNumber <= 0xFFFFFF){
        backgroundColor = color;
    }
}

/**
 * Changes default font size/scaling.
 * 
 * @param {String} size Specifies font size to be set.
 */
function setFontSize(size){
    if(size >= 8 && size <= 96){
        fontSize = size
    }
}

/**
 * Changes default font color.
 * 
 * @param {String} color Specifies font size to be set.
 */
function setFontColor(color){
    hexNumber = parseInt(color, 16);
    if(hexNumber >= 0x000000 && hexNumber <= 0xFFFFFF){
        fontColor = color;
    }
}

/**
 * Changes default window size/scaling.
 * 
 * @param {Number} height Specifies window height to be set.
 * @param {Number} width  Specifies window width to be set.
 */
function setWindow(height, width){
    setWindowHeight(height);
    setWindowWidth(width);
}

/**
 * Changes default window height size/scaling.
 * 
 * @param {Number} height Specifies window height to be set.
 */
function setWindowHeight(height){
    if(height >= 400 && height <= 800){
        windowHeight = height;
    }
}

/**
 * Changes default window width size/scaling.
 * 
 * @param {Number} width Specifies window size to be set.
 */
function setWindowWidth(width){
    if(width >= 400 && width <= 800){
        windowWidth = width;
    }
}

/**
 * Toggles default task input form between comprehensive and quick input schemes.
 */
function toggleQuickAdd(){
    quickAddEnabled = !quickAddEnabled;
}