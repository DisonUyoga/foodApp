export function getTimeDifferenceInSeconds(date1: Date, date2: string) {
    // Convert dates to timestamps in milliseconds
    const timestamp1 = new Date(date1).getTime();
    const timestamp2 = new Date(date2).getTime();
  
    // Calculate the difference in milliseconds
    const difference = Math.abs(timestamp2 - timestamp1);
  
  
    // Convert difference to seconds
    const differenceInSeconds = Math.floor(difference / 1000);
   
  
    return differenceInSeconds;
  }
  
 
  
  // ```javascript
  // // Create Date objects with different time zones
  // const date1 = new Date('2024-07-01T12:00:00Z'); // UTC
  // const date2 = new Date('2024-07-02T08:00:00-04:00'); // UTC-4
  
  // // Convert both dates to UTC
  // const utcTime1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate(), date1.getHours(), date1.getMinutes(), date1.getSeconds());
  // const utcTime2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate(), date2.getHours(), date2.getMinutes(), date2.getSeconds());
  
  // // Calculate the difference in milliseconds and convert to seconds
  // const timeDifferenceInMilliseconds = utcTime2 - utcTime1;
  // const timeDifferenceInSeconds = timeDifferenceInMilliseconds / 1000;
  
  // console.log('Time difference in seconds:', timeDifferenceInSeconds);
  // ```
  
  
  