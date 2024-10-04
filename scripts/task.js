class Task{

  /**
  * The constructor for the Task class.
  */
  constructor(taskName, description, taskCategory, date, complete, recurring)
  {
    this.taskName= taskName; //String
    this.description = description; //String
    this.taskCategory = taskCategory; //String
    this.date = date; //Date Object
    this.complete = complete; //boolean
    this.recurring = recurring; //boolean
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
  function changeRecurring (isRecurring) {
  }
  
  /**
  * function to mark the Task as complete.
  */
  function complete () {
  }

}
