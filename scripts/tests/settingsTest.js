const {
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
} = require('../settings');

describe('Settings.js Full Coverage Tests', () => {
    beforeEach(() => {
        globals.windowTheme = 'light';
        globals.backgroundColor = 'FFFFFF';
        globals.fontColor = '000000';
        globals.fontSize = 12;
        globals.windowWidth = 400;
        globals.windowHeight = 400;
        globals.quickAddEnabled = false;
    });

    test('maxLengthCheck truncates input correctly', () => {
        const input = { value: '123456', max: { length: 3 } };
        maxLengthCheck(input);
        expect(input.value).toBe('123');
    });

    test('maxLengthCheck allows input within max length', () => {
        const input = { value: '12', max: { length: 3 } };
        maxLengthCheck(input);
        expect(input.value).toBe('12');
    });

    test('maxLengthCheck handles boundary case where lengths are equal', () => {
        const input = { value: '123', max: { length: 3 } };
        maxLengthCheck(input);
        expect(input.value).toBe('123');
    });

    test('isNumeric uses provided event (evt)', () => {
        const numericEvent = { key: '5', preventDefault: jest.fn() };
        isNumeric(numericEvent);
        expect(numericEvent.preventDefault).not.toHaveBeenCalled();
    });

    test('isNumeric uses provided event (evt)', () => {
        const numericEvent = { key: '5', preventDefault: jest.fn() };
        isNumeric(numericEvent);
        expect(numericEvent.preventDefault).not.toHaveBeenCalled();
    });
    
    test('isNumeric assigns theEvent to window.event when evt is undefined', () => {
        // Mock `window.event`
        global.window = { event: { key: '5', preventDefault: jest.fn() } };
        isNumeric(undefined); // Call with undefined evt to force `window.event`
        expect(global.window.event.preventDefault).not.toHaveBeenCalled();
        delete global.window.event; // Cleanup after test
    });
    
    test('isNumeric handles undefined evt and window.event gracefully', () => {
        delete global.window.event; // Ensure window.event is undefined
        const numericEvent = undefined;
        expect(() => isNumeric(numericEvent)).not.toThrow();
    });

    test('isNumeric falls back to String.fromCharCode when key is undefined', () => {
        const event = { keyCode: 53, preventDefault: jest.fn() }; // ASCII for '5'
        isNumeric(event);
        expect(event.preventDefault).not.toHaveBeenCalled();
    });

    test('isNumeric uses theEvent.keyCode when available', () => {
        const event = { keyCode: 53, preventDefault: jest.fn() }; // ASCII for '5'
        isNumeric(event);
        expect(event.preventDefault).not.toHaveBeenCalled();
    });

    test('isNumeric falls back to theEvent.which when keyCode is undefined', () => {
        const event = { which: 53, preventDefault: jest.fn() }; // ASCII for '5'
        isNumeric(event);
        expect(event.preventDefault).not.toHaveBeenCalled();
    });

    test('isNumeric blocks non-numeric input', () => {
        const nonNumericEvent = { key: 'A', preventDefault: jest.fn() };
        isNumeric(nonNumericEvent);
        expect(nonNumericEvent.preventDefault).toHaveBeenCalled();
    });

    test('isNumeric handles missing preventDefault gracefully', () => {
        const event = { key: 'A' }; // No preventDefault
        expect(() => isNumeric(event)).not.toThrow();
    });

    test('setTheme sets light and dark themes correctly', () => {
        setTheme('light');
        expect(globals.windowTheme).toBe('light');
        expect(globals.backgroundColor).toBe('FFFFFF');
        expect(globals.fontColor).toBe('000000');

        setTheme('dark');
        expect(globals.windowTheme).toBe('dark');
        expect(globals.backgroundColor).toBe('1E1E1E');
        expect(globals.fontColor).toBe('A5A5A5');
    });

    test('setTheme handles custom and invalid themes', () => {
        setTheme('custom');
        expect(globals.windowTheme).toBe('custom');

        setTheme('invalid');
        expect(globals.windowTheme).toBe('custom');
    });

    test('setBackgroundColor handles valid and invalid colors', () => {
        setBackgroundColor('000000');
        expect(globals.backgroundColor).toBe('000000');

        setBackgroundColor('FFFFFF');
        expect(globals.backgroundColor).toBe('FFFFFF');

        setBackgroundColor('ZZZZZZ'); // Invalid
        expect(globals.backgroundColor).not.toBe('ZZZZZZ');
    });

    test('setFontSize sets valid sizes and ignores invalid ones', () => {
        setFontSize(12);
        expect(globals.fontSize).toBe(12);

        setFontSize(100); // Invalid
        expect(globals.fontSize).not.toBe(100);
    });

    test('setFontColor sets valid colors within range', () => {
        setFontColor('000000');
        expect(globals.fontColor).toBe('000000');
    
        setFontColor('FFFFFF');
        expect(globals.fontColor).toBe('FFFFFF');
    });
    
    test('setFontColor ignores colors below valid range', () => {
        setFontColor('-00001'); // Below range
        expect(globals.fontColor).not.toBe('-00001');
    });
    
    test('setFontColor ignores colors above valid range', () => {
        setFontColor('1000000'); // Above range
        expect(globals.fontColor).not.toBe('1000000');
    });
    
    test('setFontColor ignores invalid colors that do not parse', () => {
        setFontColor('ZZZZZZ'); // Invalid hex
        expect(globals.fontColor).not.toBe('ZZZZZZ');
    });

    test('setWindowHeight and setWindowWidth handle boundaries', () => {
        setWindowHeight(400);
        expect(globals.windowHeight).toBe(400);

        setWindowHeight(800);
        expect(globals.windowHeight).toBe(800);

        setWindowHeight(300); // Invalid
        expect(globals.windowHeight).not.toBe(300);

        setWindowWidth(400);
        expect(globals.windowWidth).toBe(400);

        setWindowWidth(800);
        expect(globals.windowWidth).toBe(800);

        setWindowWidth(300); // Invalid
        expect(globals.windowWidth).not.toBe(300);
    });

    test('setWindow sets both dimensions and ignores invalid inputs', () => {
        setWindow(500, 600);
        expect(globals.windowHeight).toBe(500);
        expect(globals.windowWidth).toBe(600);

        setWindow(300, 600); // Invalid height
        expect(globals.windowHeight).not.toBe(300);

        setWindow(500, 900); // Invalid width
        expect(globals.windowWidth).not.toBe(900);
    });

    test('toggleQuickAdd toggles state correctly', () => {
        toggleQuickAdd();
        expect(globals.quickAddEnabled).toBe(true);

        toggleQuickAdd();
        expect(globals.quickAddEnabled).toBe(false);
    });


    // Integration Tests
test('Theme settings update background and font colors', () => {
    setTheme('dark');
    expect(globals.windowTheme).toBe('dark');
    expect(globals.backgroundColor).toBe('1E1E1E');
    expect(globals.fontColor).toBe('A5A5A5');

    setTheme('light');
    expect(globals.windowTheme).toBe('light');
    expect(globals.backgroundColor).toBe('FFFFFF');
    expect(globals.fontColor).toBe('000000');

    setTheme('custom');
    expect(globals.windowTheme).toBe('custom');
});

test('Window settings update height and width through setWindow', () => {
    setWindow(500, 600);
    expect(globals.windowHeight).toBe(500);
    expect(globals.windowWidth).toBe(600);

    setWindowHeight(700);
    expect(globals.windowHeight).toBe(700);

    setWindowWidth(450);
    expect(globals.windowWidth).toBe(450);

    setWindow(300, 900); // Invalid height and width
    expect(globals.windowHeight).not.toBe(300);
    expect(globals.windowWidth).not.toBe(900);
});

test('setFontSize updates font size and interacts with globals', () => {
    // Set a valid font size
    setFontSize(16);
    expect(globals.fontSize).toBe(16);

    // Set an invalid font size (below range)
    setFontSize(6);
    expect(globals.fontSize).not.toBe(6);

    // Set an invalid font size (above range)
    setFontSize(100);
    expect(globals.fontSize).not.toBe(100);

    // Ensure no unintended changes to other globals
    expect(globals.windowTheme).toBe('light');
    expect(globals.backgroundColor).toBe('FFFFFF');
    expect(globals.fontColor).toBe('000000');
});

test('Input validation with maxLengthCheck and isNumeric', () => {
    const input = { value: '123456', max: { length: 3 } };
    maxLengthCheck(input);
    expect(input.value).toBe('123');

    const numericEvent = { key: '5', preventDefault: jest.fn() };
    isNumeric(numericEvent);
    expect(numericEvent.preventDefault).not.toHaveBeenCalled();

    const nonNumericEvent = { key: 'A', preventDefault: jest.fn() };
    isNumeric(nonNumericEvent);
    expect(nonNumericEvent.preventDefault).toHaveBeenCalled();
});

test('toggleQuickAdd changes global state without affecting others', () => {
    toggleQuickAdd();
    expect(globals.quickAddEnabled).toBe(true);

    toggleQuickAdd();
    expect(globals.quickAddEnabled).toBe(false);

    expect(globals.windowTheme).toBe('light');
    expect(globals.backgroundColor).toBe('FFFFFF');
    expect(globals.fontColor).toBe('000000');
});
});
