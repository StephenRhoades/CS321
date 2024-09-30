/**
  *Class declaration for a Calender Object. A Calender is initialized with an array of yearCalenders representing 
  *the Calender Years in range interval (12 years before - present year - 12 years after).
  */
class Calender{
  yearCalender;
  constructor()
  {
    this.yearCalender = new Array(25);
  }

  get yearCalender()
  {
    return this.yearCalender;
  }
}

/**
  *Class declaration for a yearCalender Object. A Calender is initialized with an array of month calenders representing 
  *the 12 months in a single year. 
  */
class yearCalender extends Calender{
  monthCalender;
  constructor()
  {
    this.monthCalender = new Array(12);
  }

  get monthCalender()
  {
    return this.monthCalender;
  }
}
/**
*Class declaration of month Calender Object. A  month Calender is initialized with an array representing the days within a month. 
*days: The number of days (integer) within a particular month
*/
class monthCalender extends yearCalender{
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

