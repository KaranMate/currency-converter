async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;
  const resultDiv = document.getElementById("result");

  if (!amount) {
    resultDiv.innerText = "Please enter an amount.";
    return;
  }

  resultDiv.innerText = "Converting...";

  try {
    const response = await fetch("/convert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from: fromCurrency, to: toCurrency, amount }),
    });

    const data = await response.json();

    // FIXED LOGIC
    if (data.converted !== undefined && data.converted !== null) {
      resultDiv.innerText = `${amount} ${fromCurrency} = ${data.converted} ${toCurrency}`;
    } else {
      resultDiv.innerText = "Error: " + (data.error || "Conversion failed");
    }
  } catch (error) {
    resultDiv.innerText = "Error: " + error.message;
  }
}
