class Task{

  /**
  * The constructor for the Task class.
  *
  * This constructor will initialize with values recieved for name, description, category, date, 
  * and if it's recurring and defaul complete to false and reminders to an empty array. Any of 
  * the values can be left empty except for the date field. If no date is provided an error will
  * be thrown.
  *
  * @since 0.2.0
  *
  * @constructs Task.Class
  *
  * @param {String}  taskName     The name of the task.
  * @param {String}  description  The description of the task.
  * @param {String}  taskCategory The category of the task.
  * @param {Date}    date         The date of the task.
  * @param {Boolean} recurring    Whether the task is recurring or not.
  */
  constructor(taskName, description, taskCategory, date, recurring)
  {
    this.taskName= taskName; //String
    this.description = description; //String
    this.taskCategory = taskCategory; //String
    this.date = date; //Date Object
    this.complete = false; //boolean
    this.recurring = recurring; //boolean
    this.reminders = [] //array of reminders
  }

  /**
  * Get method for the Task's name value.
  */
  get taskName()
  {
    return this.taskName;
  }
  
  /**
  * Get method for the Task's description.
  */
  get description()
  {
    return this.description;
  }

  /**
  * Get method for the Task's category.
  */
  get taskCategory()
  {
    return this.taskCategory;
  }

  /**
  * Get method for the Task's date.
  */
  get date()
  {
    return this.date;
  }

  /**
  * Get method for the Task's completion status.
  */
  get complete()
  {
    return this.complete;
  }

  /**
  * Get method for whether the Task is recurring.
  */
  get recurring()
  {
    return this.recurring;
  }

  /**
  * Get method for the Task's reminders.
  */
  get reminders()
  {
    return this.reminders;
  }

  /**
  * function to change the name value of the Task.
  */
  function changeName (name) {
  }
  
  /**
  * function to change the description value of the Task.
  */
  function changeDescription (description) {
  }

  /**
  * function to change the category value of the Task.
  */
  function changeCategory (category) {
  }
  
  /**
  * function to change the date value of the Task.
  */
  function changeDueDate (date) {
  }

  
  /**
  * function to change the complete value of the Task.
  */
  function changeComplete(isComplete){
  }

  /**
  * function to change the recurring value of the Task.
  */
  function changeRecurring(isRecurring) {
  }

  /**
  * function to add a new reminder.
  */
  function addReminder(newReminder) {
  }

  /**
  * function to remove a reminder.
  */
  function remReminder(reminder) {
  }
  
  /**
  * function to mark the Task as complete.
  */
  function complete () {
  }

}
