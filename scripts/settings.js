const globals = {
    windowTheme: 'light',
    backgroundColor: 'FFFFFF',
    fontColor: '000000',
    fontSize: 12,
    windowWidth: 400,
    windowHeight: 400,
    quickAddEnabled: false,
};

function maxLengthCheck(object) {
    if (object.value.length > object.max.length) {
        object.value = object.value.slice(0, object.max.length);
    }
}

function isNumeric(evt) {
    const theEvent = evt || window.event;
    const key = theEvent.key || String.fromCharCode(theEvent.keyCode || theEvent.which);
    const regex = /^[0-9]$/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

function setTheme(theme) {
    if (theme === 'light') {
        globals.windowTheme = 'light';
        setBackgroundColor('FFFFFF');
        setFontColor('000000');
    } else if (theme === 'dark') {
        globals.windowTheme = 'dark';
        setBackgroundColor('1E1E1E');
        setFontColor('A5A5A5');
    } else {
        globals.windowTheme = 'custom';
    }
}

function setBackgroundColor(color) {
    const hexNumber = parseInt(color, 16);
    if (hexNumber >= 0x000000 && hexNumber <= 0xFFFFFF) {
        globals.backgroundColor = color;
    }
}

function setFontSize(size) {
    if (size >= 8 && size <= 96) {
        globals.fontSize = size;
    }
}

function setFontColor(color) {
    const hexNumber = parseInt(color, 16);
    if (hexNumber >= 0x000000 && hexNumber <= 0xFFFFFF) {
        globals.fontColor = color;
    }
}

function setWindow(height, width) {
    setWindowHeight(height);
    setWindowWidth(width);
}

function setWindowHeight(height) {
    if (height >= 400 && height <= 800) {
        globals.windowHeight = height;
    }
}

function setWindowWidth(width) {
    if (width >= 400 && width <= 800) {
        globals.windowWidth = width;
    }
}

function toggleQuickAdd() {
    globals.quickAddEnabled = !globals.quickAddEnabled;
}

module.exports = {
    maxLengthCheck,
    isNumeric,
    setTheme,
    setBackgroundColor,
    setFontSize,
    setFontColor,
    setWindow,
    setWindowHeight,
    setWindowWidth,
    toggleQuickAdd,
    globals,
};
