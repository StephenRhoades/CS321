/**
  *Class declaration for a Calendar Object. A Calendar is initialized with an array of yearCalendars representing 
  *the Calendar Years in range interval (12 years before - present year - 12 years after).
  */
class Calendar{
  yearCalendar;

  /**
   * Constructor for Calendar Object
   */
  constructor()
  {
    this.yearCalendar = new Array(25);
  }
  /**
   * Get method to get yearCalendar contained within Calendar
   */
  get yearCalendar()
  {
    return this.yearCalendar;
  }
}

/**
  *Class declaration for a yearCalendar Object. A Calendar is initialized with an array of month Calendars representing 
  *the 12 months in a single year. 
  */
class YearCalendar extends Calendar{
  monthCalendar; // monthCalendar Object
  year; //integer

  /**
   * Constructor for YearCalendar Object
   */
  constructor(year)
  {
    this.monthCalendar = new Array(12);
    this.year = year;
  }

  get monthCalendar()
  {
    return this.monthCalendar;
  }
 
  get year()
  {
    return this.year;
  }
  
}
/**
*Class declaration of month Calendar Object. A  month Calendar is initialized with an array representing the days within a month. 
*days: The number of days (integer) within a particular month
*/
class MonthCalendar extends YearCalendar{
  days; //integer
  month; //string

  /**
   * Constructor for MonthCalendar Object
   */
  constructor(days, month)
  {
    this.days = new Array(days);
    this.month = month;
  }

  get days()
  {
    return this.days;
  }
  get month()
  {
    return this.month;
  }
}
//To-do: Edit and test singly linked list to work with the task data structure.

/**
 * Class representing a node in a linked list. The node contains a task object (see task.js) and a pointer to the next node.
 * A linked list represents a sequence of days
 */
class DayNode {
  constructor(task) {
      this.task = task;
      this.next = null; // The next node in the list
  }
}

class SinglyLinkedList {
  constructor() {
      this.head = null; // The first node in the list
      this.size = 0;    // The size of the list
  }

  // Add a new node at the end of the list
  add(value) {
      const newNode = new DayNode(value);
      if (!this.head) {
          this.head = newNode; // If the list is empty, set head to new node
      } else {
          let current = this.head;
          while (current.next) {
              current = current.next; // Traverse to the end of the list
          }
          current.next = newNode; // Link the new node
      }
      this.size++; // Increase the size of the list
  }

  addSorted(value) {
    const newNode = new DayNode(value);
    if (!this.head || this.head.value >= value) {
        // Insert at the head or when the list is empty
        newNode.next = this.head;
        this.head = newNode;
    } else {
        let current = this.head;
        while (current.next && current.next.value < value) {
            current = current.next; // Traverse to find the correct spot
        }
        newNode.next = current.next; // Link new node to the next node
        current.next = newNode; // Link current node to the new node
    }
    this.size++; // Increase the size of the list
}

  // Remove a node by value
  remove(value) {
      if (!this.head) return; // If the list is empty, do nothing

      if (this.head.value === value) {
          this.head = this.head.next; // Remove head node
          this.size--;
          return;
      }

      let current = this.head;
      while (current.next) {
          if (current.next.value === value) {
              current.next = current.next.next; // Bypass the node to remove it
              this.size--;
              return;
          }
          current = current.next; // Move to the next node
      }
  }

  // Display the list
  display() {
      const elements = [];
      let current = this.head;
      while (current) {
          elements.push(current.value);
          current = current.next;
      }
      console.log(elements.join(' -> ')); // Print the values
  }

  // Get the size of the list
  getSize() {
      return this.size;
  }
}

const list = new SinglyLinkedList();
list.add(10);
list.add(20);
list.add(30);
list.display(); // Output: 10 -> 20 -> 30

list.remove(20);
list.display(); // Output: 10 -> 30

console.log(`Size of list: ${list.getSize()}`); // Output: Size of list: 2


//Basic Checks to See if code runs