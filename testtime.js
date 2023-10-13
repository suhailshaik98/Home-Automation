const array = [
    {
      value: '66.30',
      timestamp: new Date("2023-10-08T09:18:11.158Z")
    },
    {
      value: '12.05',
      timestamp: new Date("2023-10-08T09:30:02.110Z")
    },
    {
      value: '10.30',
      timestamp: new Date("2023-10-08T09:30:44.342Z")
    }
  ];
  
  const hours_count = {};
  
  for (const document of array) {
    const time = document.timestamp;
    const get_hours = time.getUTCHours();
  
    if (hours_count[get_hours]) {
      hours_count[get_hours]++;
    } else {
      hours_count[get_hours] = 1;
    }
  }
  
  console.log(hours_count);