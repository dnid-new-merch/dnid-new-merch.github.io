async function sendPhoneNumber() {
  const phoneNumber = document.getElementById("phoneNumber").value;
  const responseMessage = document.getElementById("responseMessage");

  // Validasi sederhana untuk nomor HP
  if (phoneNumber.trim() === "") {
    responseMessage.innerText = "Nomor HP tidak boleh kosong.";
    return;
  }

  try {
    const response = await fetch('/send-phone', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ phoneNumber })
    });

    const result = await response.json();

    if (response.ok) {
      responseMessage.innerText = result.message;
    } else {
      responseMessage.innerText = result.error || "Gagal mengirim nomor HP.";
    }
  } catch (error) {
    responseMessage.innerText = "Terjadi kesalahan, coba lagi nanti.";
    console.error("Error:", error);
  }
}