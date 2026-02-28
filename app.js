// Fake login (you can connect Firebase later)
function signup() {
    alert("Signup Success!");
    document.getElementById("authSection").style.display = "none";
    document.getElementById("resumeSection").style.display = "block";
}

function login() {
    alert("Login Success!");
    document.getElementById("authSection").style.display = "none";
    document.getElementById("resumeSection").style.display = "block";
}

// Add Project
function addProject() {
    const div = document.createElement("div");
    div.innerHTML = `
        <input type="text" class="projectTitle" placeholder="Project Title">
        <textarea class="projectDesc" placeholder="Project Description"></textarea>
    `;
    document.getElementById("projects").appendChild(div);
}

// Generate Resume
function generateResume() {

    const skills = [
        ...document.getElementById("programming").value.split(","),
        ...document.getElementById("web").value.split(","),
        ...document.getElementById("database").value.split(","),
        ...document.getElementById("tools").value.split(",")
    ].filter(skill => skill.trim() !== "");

    const skillList = skills.map(skill => `<li>${skill.trim()}</li>`).join("");

    const projectTitles = document.querySelectorAll(".projectTitle");
    const projectDescs = document.querySelectorAll(".projectDesc");

    let projectsHTML = "";
    for (let i = 0; i < projectTitles.length; i++) {
        if (projectTitles[i].value.trim() !== "") {
            projectsHTML += `
                <p><strong>${projectTitles[i].value}</strong></p>
                <ul>
                    <li>${projectDescs[i].value}</li>
                </ul>
            `;
        }
    }

    document.getElementById("preview").innerHTML = `
        <h1>${rname.value}</h1>
        <p style="text-align:center;">
            ${rphone.value} | ${remail.value} | ${address.value}<br>
            ${linkedin.value} | ${github.value}
        </p>

        <h3>Professional Summary</h3>
        <p>${objective.value}</p>

        <h3>Education</h3>
        <p><strong>${degree.value}</strong> - ${college.value}</p>
        <p>${gradYear.value} | ${cgpa.value}</p>

        <h3>Technical Skills</h3>
        <ul>${skillList}</ul>

        ${projectsHTML ? `<h3>Projects</h3>${projectsHTML}` : ""}
    `;
}

// Download PDF
async function downloadPDF() {

    const resume = document.querySelector(".resume");

    if (resume.innerHTML.trim() === "") {
        alert("Generate resume first!");
        return;
    }

    const canvas = await html2canvas(resume, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("Resume.pdf");
}