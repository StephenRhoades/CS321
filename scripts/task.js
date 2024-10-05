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
  *
  * @return {String} The name of the task.
  */
  get taskName()
  {
    return this.taskName;
  }
  
  /**
  * Get method for the Task's description.
  *
  * @return {String} The description of the task.
  */
  get description()
  {
    return this.description;
  }

  /**
  * Get method for the Task's category.
  *
  * @return {String} The category of the task.
  */
  get taskCategory()
  {
    return this.taskCategory;
  }

  /**
  * Get method for the Task's date.
  *
  * @return {Date} The date of the task.
  */
  get date()
  {
    return this.date;
  }

  /**
  * Get method for the Task's completion status.
  *
  * @return {Boolean} The completion status of the task.
  */
  get complete()
  {
    return this.complete;
  }

  /**
  * Get method for whether the Task is recurring.
  *
  * @return {Boolean} Whether the task is recurring.
  */
  get recurring()
  {
    return this.recurring;
  }

  /**
  * Get method for the Task's reminders.
  *
  * @return {Array} The list of current reminder times.
  */
  get reminders()
  {
    return this.reminders;
  }

  /**
  * function to change the name value of the Task.
  *
  * @param {String} name The new name for the task.
  */
  function changeName (name) {
  }
  
  /**
  * function to change the description value of the Task.
  *
  * @param {String} description The new description for the task.
  */
  function changeDescription (description) {
  }

  /**
  * function to change the category value of the Task.
  *
  * @param {String} category The new category of the task.
  */
  function changeCategory (category) {
  }
  
  /**
  * function to change the date value of the Task.
  *
  * @param {Date} date The new date of the task.
  */
  function changeDueDate (date) {
  }

  
  /**
  * function to change the complete value of the Task.
  *
  * @param {Boolean} complete Whether or not the task is complete.
  */
  function changeComplete(isComplete){
  }

  /**
  * function to change the recurring value of the Task.
  *
  * @param {Boolean} isRecurring Whether or not the task is recurring.
  */
  function changeRecurring(isRecurring) {
  }

  /**
  * function to add a new reminder.
  *
  * @param {Date} newReminder A new time to set a reminder for.
  */
  function addReminder(newReminder) {
  }

  /**
  * function to remove a reminder.
  *
  * @param {Date} reminder The reminder to remove.
  */
  function remReminder(reminder) {
  }
  
  /**
  * function to mark the Task as complete.
  *
  * Marks the current task as being completed.
  */
  function complete () {
  }

}
