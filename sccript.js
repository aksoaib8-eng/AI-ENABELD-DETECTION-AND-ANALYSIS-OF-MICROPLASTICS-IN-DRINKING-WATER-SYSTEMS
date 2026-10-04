const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");

imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (event) {
            preview.innerHTML =
                `<img src="${event.target.result}" alt="Water sample">`;
        };

        reader.readAsDataURL(file);
    }
});

async function analyzeImage() {

    const file = imageInput.files[0];

    if (!file) {
        alert("Please upload a water sample image first.");
        return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/analyze",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        document.getElementById("result").style.display = "block";

        document.getElementById("particleCount").textContent =
            data.particles;

        document.getElementById("concentration").textContent =
            data.concentration;

        document.getElementById("risk").textContent =
            data.risk;

        document.getElementById("confidence").textContent =
            data.confidence;

        document.getElementById("samples").textContent =
            data.sample_id;

        document.getElementById("particles").textContent =
            data.particles;

    } catch (error) {

        alert("Backend server is not running.");
        console.log(error);

    }
}

function showMessage() {

    document.getElementById("message").textContent =
        "Microplastic AI detection system is ready for sample analysis.";
}