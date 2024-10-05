/**
  *Class declaration for a Calendar Object. A Calendar is initialized with an array of yearCalendars representing 
  *the Calendar Years in range interval (12 years before - present year - 12 years after).
  */
class Calendar{
  yearCalendar;
  constructor()
  {
    this.yearCalendar = new Array(25);
  }

  get yearCalendar()
  {
    return this.yearCalendar;
  }
}

/**
  *Class declaration for a yearCalendar Object. A Calendar is initialized with an array of month Calendars representing 
  *the 12 months in a single year. 
  */
class yearCalendar extends Calendar{
  monthCalendar; // monthCalendar Object
  year; //integer
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
class monthCalendar extends yearCalendar{
  days; //integer
  month; //string
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
//To-do: Declare Class Days. Days represent a single day within a month, within a year. Days should be contain a sorted linked list of Task objects, sorted by task due date from soonest to latest.

