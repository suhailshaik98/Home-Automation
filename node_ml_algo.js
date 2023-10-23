const { exec } = require('child_process');

// Function to run a Python command and return a Promise
function runPythonCommand(hour,weekday,value) {
  return new Promise((resolve, reject) => {
    // Define the Python command
    const pythonCommand = `python3 ml_algo.py ${hour} ${weekday} ${value}`;
    
    // Execute the Python command
    exec(pythonCommand, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}

// Function to parse datetime, extract values, and run Python command
async function parseDatetimeAndRunPython(value) {
  // Example datetime string in the format yyyy-mm-dd hh:mm:ss
  const distance_value =  parseInt(value)
  const timestamp = new Date();
  timestamp.setUTCHours(timestamp.getUTCHours());

  // Extract hour, day, and weekday from the parsed date
  var hour = timestamp.getHours();
  var day = timestamp.getDate();
  let weekday = timestamp.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday

  // Adjust the weekday to match the desired range (1-7 where Monday is 1)
  if (weekday === 0) {
    weekday = 7;
  }

  // Call the async function to run the Python command
  try {
    // Run the Python command and await the result
    const pythonResult = await runPythonCommand(hour,weekday,distance_value);

    // Output the Python result and other parsed values
    console.log('Python Command Output:', pythonResult);
    console.log('Hour:', hour);
    console.log('Day:', day);
    console.log('Weekday:', weekday);
    console.log("Value:",value)
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to parse datetime and run the Python command
module.exports = { parseDatetimeAndRunPython };
