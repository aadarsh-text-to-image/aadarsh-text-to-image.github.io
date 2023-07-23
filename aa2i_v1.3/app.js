// Aa2I v1.3

function generateImage(e) {
	e.preventDefault();
	var inputText = document.getElementById("textInput").value;
	var text = inputText.split(" ").join("%20");
	var url = `https://aa2i.onrender.com/t2i/${text}`;
	// var url = `https://b3ude6lubemuuvqmngjpwm7jlm0sjapc.lambda-url.ap-south-1.on.aws/t2i/${text}`;
	var imgelem = document.createElement("img");
	imgelem.setAttribute("alt", "generated_image");
	imgelem.setAttribute("id", "generatedImage");

	let loadingElement = document.getElementById("loadingAnimation");
	loadingElement.classList.add("play");

	fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			console.log(response);
			return response.json();
		})
		.then((data) => {
			if (document.querySelector(".result:has(#generatedImage)")) {
				document
					.querySelector(".result")
					.removeChild(document.querySelector(".result").children[0]);
			}
			loadingElement.classList.remove("play");
			document.querySelector(".result").appendChild(imgelem);
			const generatedImage = document.getElementById("generatedImage");
			generatedImage.src = data.image_url;
		})
		.catch((error) => {
			loadingElement.classList.remove("play");
			console.error("There was an error generating the image:", error);
		});
}

let btn = document.getElementById("submitBtn");
btn.addEventListener("click", generateImage);

let input = document.getElementById("textInput");
input.addEventListener("keypress", function (event) {
	if (event.key === "Enter") {
		event.preventDefault();
		generateImage(event);
	}
});
