document.getElementById("timestamp-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const input = document.getElementById("dateInput").value.trim();
    const unixOutput = document.getElementById("unix");
    const utcOutput = document.getElementById("utc");
    const errorOutput = document.getElementById("error");
  
    // Reset previous results
    unixOutput.textContent = '';
    utcOutput.textContent = '';
    errorOutput.textContent = '';
  
    try {
      const url = input ? `/api/${input}` : '/api';
      const res = await fetch(url);
      const data = await res.json();
  
      if (data.error) {
        errorOutput.textContent = data.error;
      } else {
        unixOutput.textContent = data.unix;
        utcOutput.textContent = data.utc;
      }
    } catch (err) {
      errorOutput.textContent = "Something went wrong. Please try again.";
      console.error(err);
    }
  });
  