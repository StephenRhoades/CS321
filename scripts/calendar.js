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
  monthCalendar;
  constructor()
  {
    this.monthCalendar = new Array(12);
  }

  get monthCalendar()
  {
    return this.monthCalendar;
  }
}
/**
*Class declaration of month Calendar Object. A  month Calendar is initialized with an array representing the days within a month. 
*days: The number of days (integer) within a particular month
*/
class monthCalendar extends yearCalendar{
  days;
  constructor(days)
  {
    this.days = new Array(days);
  }

  get days()
  {
    return this.days;
  }
}
//To-do: Declare Class Days. Days represent a single day within a month, within a year. Days should be contain a sorted linked list of Task objects, sorted by task due date from soonest to latest.

