// Your code here
function createEmployeeRecord(employeeInfo){
    const [firstName, familyName, title, payPerHour] = employeeInfo;

    const employeeRecord = {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
    return employeeRecord 
}

function createEmployeeRecords(employeesArray){
    const employeeRecords = [];
    for(const employeeInfo of employeesArray) {
        const employeeRecord = createEmployeeRecord(employeeInfo);
        employeeRecords.push(employeeRecord);
    }
    return employeeRecords;
}
 function createTimeInEvent(employeeRecord, dateStamp) {
   const [date, hour] = dateStamp.split(" ");

   const timeInEvent = {
     type: "TimeIn",
     hour: parseInt(hour, 10),
     date: date
   };
    employeeRecord.timeInEvents.push(timeInEvent);

    return employeeRecord;
 }

 function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");

    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    };
    employeeRecord.timeOutEvents.push(timeOutEvent);

    return employeeRecord;
 }
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;

  }
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payPerHour = employeeRecord.payPerHour;

    const payOwed = hoursWorked * payPerHour;
    return payOwed;
  }
  function allWagesFor(employeeRecord){
    let totalPay = 0;
    for(const timeInEvent of employeeRecord.timeInEvents) {
        const date = timeInEvent.date;
        const payOwed = wagesEarnedOnDate(employeeRecord, date);
        totalPay += payOwed;
    }
    return totalPay;
  }
  function calculatePayroll(employeeRecordsArray) {
    let totalPayroll = 0;
    for(const employeeRecord of employeeRecordsArray) {
        const employeePay = allWagesFor(employeeRecord);
        totalPayroll += employeePay;
    }
    return totalPayroll;

  }