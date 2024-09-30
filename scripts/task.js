class Task{
  
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
  *Get methods for the Task data structure
  */
  get taskName()
  {
    return this.taskName;
  }
  get description()
  {
    return this.description;
  }
  get taskCategory()
  {
    return this.taskCategory;
  }
  get date()
  {
    return this.date;
  }
  get complete()
  {
    return this.complete;
  }
  
  get recurring()
  {
    return this.recurring;
  }
}
