class PosterGenerator {
    constructor() {
        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        this.elements = {
            nameInput: document.getElementById("name"),
            addressInput: document.getElementById("address"),
            birthInput: document.getElementById("birth"),
            deathInput: document.getElementById("death"),
            photoInput: document.getElementById("photo"),
            previewPhoto: document.getElementById("previewPhoto"),
            verseSelect: document.getElementById("verseSelect"),
            customVerse: document.getElementById("customVerse"),
            bgImageSelect: document.getElementById("bgImageSelect"),
            poster: document.getElementById("poster"),
            previewName: document.getElementById("previewName"),
            previewAddress: document.getElementById("previewAddress"),
            previewDates: document.getElementById("previewDates"),
            previewVerse: document.getElementById("previewVerse")
        };
    }

    bindEvents() {
        this.elements.nameInput.addEventListener('input', () => this.updateName());
        this.elements.addressInput.addEventListener('input', () => this.updateAddress());
        this.elements.birthInput.addEventListener('change', () => this.updateDates());
        this.elements.deathInput.addEventListener('change', () => this.updateDates());
        this.elements.photoInput.addEventListener('change', (e) => this.handlePhotoUpload(e));
        this.elements.verseSelect.addEventListener('change', () => this.updateVerse());
        this.elements.customVerse.addEventListener('input', () => this.updateCustomVerse());
        this.elements.bgImageSelect.addEventListener('change', () => this.updateBackground());
    }

    updateName() {
        this.elements.previewName.textContent = this.elements.nameInput.value || "Full Name";
    }

    updateAddress() {
        this.elements.previewAddress.textContent = this.elements.addressInput.value || "Address";
    }

    updateDates() {
        const birth = this.formatDate(this.elements.birthInput.value);
        const death = this.formatDate(this.elements.deathInput.value);
        
        this.elements.previewDates.textContent = (birth && death) 
            ? `${birth} – ${death}`
            : "January 1, 1950 – January 1, 2024";
    }

    handlePhotoUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            this.elements.previewPhoto.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    updateVerse() {
        if (this.elements.verseSelect.value) {
            this.elements.previewVerse.textContent = this.elements.verseSelect.value;
            this.elements.customVerse.value = "";
        }
    }

    updateCustomVerse() {
        this.elements.previewVerse.textContent = this.elements.customVerse.value || 
            "Blessed are those who mourn, for they shall be comforted. – Matthew 5:4";
        this.elements.verseSelect.value = "";
    }

    updateBackground() {
        const bg = this.elements.bgImageSelect.value;
        
        if (bg) {
            this.elements.poster.style.backgroundImage = `url('backgrounds/${bg}')`;
        } else {
            this.elements.poster.style.backgroundImage = "";
            this.elements.poster.style.backgroundColor = "#fafafa";
        }
    }

    formatDate(dateValue) {
        if (!dateValue) return "";
        
        const date = new Date(dateValue);
        return date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric", 
            year: "numeric"
        });
    }
}

// Download function
async function downloadPoster() {
    try {
        const poster = document.getElementById("poster");
        const canvas = await html2canvas(poster, {
            scale: 2,
            useCORS: true,
            backgroundColor: null,
            logging: false
        });
        
        const link = document.createElement("a");
        link.download = "memorial-poster.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    } catch (error) {
        console.error("Error generating poster:", error);
        alert("Error generating poster. Please try again.");
    }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    new PosterGenerator();
});