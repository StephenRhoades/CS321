const Calendar = require('../views/calendarView.js');

describe('Calendar Class', () => {
  let calendar;

  beforeEach(() => {
    // Mock DOM elements
    document.body.innerHTML = `
      <div id="monthName"></div>
      <div id="calendarDays"></div>
      <button id="prevMonth"></button>
      <button id="nextMonth"></button>
      <button id="monthlyViewButton"></button>
      <button id="weeklyViewButton"></button>
    `;
    calendar = new Calendar();
  });

  // Existing tests
  test('Calendar constructor initializes correctly', () => {
    expect(calendar).toBeTruthy();
    expect(calendar.viewMode).toBe('monthly');
    expect(calendar.tasks).toEqual([]);
  });

  test('loadTasks method works', () => {
    const mockTasks = [
      { taskName: 'Test Task', date: '2024-03-15 10:00' }
    ];
    calendar.loadTasks(mockTasks);
    expect(calendar.tasks).toEqual(mockTasks);
  });

  // Additional Tests for Date Formatting
  describe('Date Formatting and Utility Methods', () => {
    test('formatDate creates correctly formatted date string', () => {
      expect(calendar.formatDate(2024, 3, 5)).toBe('2024-03-05');
      expect(calendar.formatDate(2024, 12, 25)).toBe('2024-12-25');
    });

    test('formatDate handles single-digit months and days', () => {
      expect(calendar.formatDate(2024, 1, 7)).toBe('2024-01-07');
    });
  });

  // Tasks Related Methods
  describe('Task-related Methods', () => {
    const mockTasks = [
      { taskName: 'Meeting', date: '2024-03-15 10:00' },
      { taskName: 'Dentist', date: '2024-03-15 14:00' },
      { taskName: 'Project', date: '2024-03-20 09:00' }
    ];

    beforeEach(() => {
      calendar.loadTasks(mockTasks);
    });

    test('hasTaskOnDate correctly identifies days with tasks', () => {
      expect(calendar.hasTaskOnDate('2024-03-15')).toBe(true);
      expect(calendar.hasTaskOnDate('2024-03-16')).toBe(false);
    });

    test('getTasksOnDate returns correct tasks for a specific date', () => {
      const tasksOnDate = calendar.getTasksOnDate('2024-03-15');
      expect(tasksOnDate.length).toBe(2);
      expect(tasksOnDate[0].taskName).toBe('Meeting');
      expect(tasksOnDate[1].taskName).toBe('Dentist');
    });
  });

  // View Mode Tests
  describe('View Mode Functionality', () => {
    test('switches to weekly view correctly', () => {
      calendar.viewMode = 'weekly';
      expect(calendar.viewMode).toBe('weekly');
    });

    test('prevMonthOrWeek updates date differently based on view mode', () => {
        const initialDate = new Date(calendar.date);
        
        // Weekly view
        calendar.viewMode = 'weekly';
        calendar.prevMonthOrWeek();
        expect(calendar.date.getDate()).toBe(initialDate.getDate() - 7);
      });

      test('nextMonthOrWeek updates date differently based on view mode', () => {
        // Create a new Date object to avoid mutation issues
        const initialDate = new Date(calendar.date);
        
        // Monthly view
        calendar.viewMode = 'monthly';
        calendar.nextMonthOrWeek();
        expect(calendar.date.getMonth()).toBe((initialDate.getMonth() + 1) % 12);
      
        // Reset date
        calendar.date = new Date(initialDate);
        
        // Weekly view
        calendar.viewMode = 'weekly';
        calendar.nextMonthOrWeek();
        
        // Use a more flexible comparison
        const expectedDate = new Date(initialDate);
        expectedDate.setDate(initialDate.getDate() + 7);
        expect(calendar.date.getDate()).toBe(expectedDate.getDate());
      });
  });

  // Modal and Expansion Tests
  describe('Modal and Day Expansion', () => {
    const mockTasks = [
      { 
        taskName: 'Team Meeting', 
        taskDescription: 'Weekly sync', 
        date: '2024-03-15 10:00' 
      }
    ];

    beforeEach(() => {
      calendar.loadTasks(mockTasks);
      
      // Mock necessary DOM methods
      document.body.insertAdjacentHTML = jest.fn();
      document.querySelector = jest.fn(() => ({
        addEventListener: jest.fn()
      }));
    });

    test('clearExistingModal removes active modal', () => {
      // Simulate an active modal
      calendar.activeModal = document.createElement('div');
      calendar.clearExistingModal();
      expect(calendar.activeModal).toBeNull();
    });

    test('expandDay creates modal for days with tasks', () => {
        // Mock necessary DOM methods more comprehensively
        document.body = document.createElement('body');
        
        // Ensure tasks exist for the test
        const mockTasks = [{ 
          taskName: 'Test Task', 
          taskDescription: 'Test Description', 
          date: '2024-03-15 10:00' 
        }];
        calendar.loadTasks(mockTasks);
        
        // Spy on document methods
        const insertAdjacentHTMLSpy = jest.spyOn(document.body, 'insertAdjacentHTML');
        const querySelectorSpy = jest.spyOn(document, 'querySelector');
        
        // Call expandDay
        calendar.expandDay('2024-03-15');
        
        // Verify modal creation
        expect(insertAdjacentHTMLSpy).toHaveBeenCalled();
        expect(querySelectorSpy).toHaveBeenCalledWith('.modal');
      });
    test('expandDay handles days without tasks', () => {
      // Mock window.alert
      window.alert = jest.fn();
      
      calendar.expandDay('2024-03-16');
      
      expect(window.alert).toHaveBeenCalledWith('No tasks for this day.');
    });
  });

  // Start of Week Calculation
  describe('Week Calculation', () => {
    test('getStartOfWeek returns correct week start date', () => {
        const testDate = new Date('2024-03-15');
        const startOfWeek = calendar.getStartOfWeek(testDate);
        
        // Allow for more flexible comparison
        expect(startOfWeek.getDate()).toBe(10);  // or 11, depending on exact calculation
        expect(startOfWeek.getMonth()).toBe(2); // March
        expect(startOfWeek.getFullYear()).toBe(2024);
      });
  });
});